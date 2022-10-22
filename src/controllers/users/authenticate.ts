import { Request, Response, NextFunction } from 'express'
import UserModel from '../../models/user'
import HttpError from '../../models/httpError'
import validator from 'validator'
import compareHashedPassword from '../../utils/compareHashedPassword'
import generateAuthTokens from '../../utils/generateAuthTokens'

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { phoneNumber, password } = req.body

  // Validate required fields
  if (!phoneNumber || !password) {
    return next(new HttpError('Please provide phoneNumber and password', 400))
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

  // Check if user exists
  try {
    const user = await UserModel.findOne({ phoneNumber })
    if (!user) {
      return next(new HttpError('Invalid credentials', 401))
    }

    // Check if password matches
    const isMatch = await compareHashedPassword(password, user.password)
    if (!isMatch) {
      return next(new HttpError('Invalid credentials', 401))
    }

    // Generate token
    const token = generateAuthTokens(user.id)

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
    res.status(200).json({
      status: 'success',
      message: 'User authenticated successfully',
      data: {
        user: userData,
        token,
      },
    })
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }
}

export default authenticate
