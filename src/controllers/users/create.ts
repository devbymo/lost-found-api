import { Request, Response, NextFunction } from 'express'
import User from '../../types/user'
import UserModel from '../../models/user'
import HttpError from '../../models/httpError'
import validator from 'validator'
import generateAuthTokens from '../../utils/generateAuthTokens'

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, phoneNumber, password, city, country } = req.body

  // Check required fields
  if (!name || !phoneNumber || !password) {
    return next(new HttpError('Please fill in all fields', 400))
  }

  // Validate phone number
  if (
    !validator.isMobilePhone(phoneNumber) ||
    !validator.isLength(phoneNumber, { min: 11, max: 11 })
  ) {
    return next(new HttpError('Please enter a valid phone number', 400))
  }

  // Validate password
  if (!validator.isLength(password, { min: 4, max: 50 })) {
    return next(new HttpError('Password must be at least 4 characters', 400))
  }

  // Validate name
  if (!validator.isLength(name, { min: 2, max: 20 })) {
    return next(new HttpError('Name must be at least 2 characters', 400))
  }

  // Validate city if passed
  if (city && !validator.isLength(city, { min: 2, max: 20 })) {
    return next(new HttpError('City must be at least 2 characters', 400))
  }

  // Validate country if passed
  if (country && !validator.isLength(country, { min: 2, max: 20 })) {
    return next(new HttpError('Country must be at least 2 characters', 400))
  }

  // Check if user exists
  let user: User
  try {
    user = (await UserModel.findOne({ phoneNumber })) as User
    if (user) {
      return next(new HttpError('User already exists', 400))
    }
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }

  const newUser: User = {
    name,
    phoneNumber,
    password,
    city: city ? city.toLowerCase() : 'cairo',
    country: country ? country.toLowerCase() : 'egypt',
  }
  try {
    const user = await UserModel.create(newUser)
    if (!user) {
      return next(new HttpError('Something went wrong, please try again', 500))
    }
    // Generate token
    const token = await generateAuthTokens(user.id)
    if (!token) {
      return next(new HttpError('Something went wrong, please try again', 500))
    }
    // Project user data
    const userData = {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      city: user.city,
      country: user.country,
      avatar: `${
        process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL
      }/api/v1/users/${user.id}/avatar`,
    }
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        user: userData,
        token,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default create
