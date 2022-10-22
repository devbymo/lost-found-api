import { Request, Response, NextFunction } from 'express'
import User from '../../types/user'
import UserModel from '../../models/user'
import HttpError from '../../models/httpError'
import validator from 'validator'

interface UserMethods extends User {
  save: () => Promise<User>
}

interface AuthRequest extends Request {
  userId?: string
}

const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { name, phoneNumber, password, city, country } = req.body

  // Check if there is invalid fields in the request body
  const allowedFields = ['name', 'phoneNumber', 'password', 'city', 'country']
  const fields = Object.keys(req.body)
  const isValidOperation = fields.every((field) => allowedFields.includes(field))
  if (!isValidOperation) {
    return next(new HttpError(`Invalid fields passed allowed fields [${allowedFields}]`, 400))
  }

  // validate id is a valid mongo id before querying database
  if (!validator.isMongoId(id)) {
    return next(new HttpError('Invalid ID', 400))
  }

  // Validate authenticated user
  if (req.userId !== id) {
    return next(new HttpError('You are not allowed to update this user', 401))
  }

  // Validate name if it is passed
  if (name && !validator.isLength(name, { min: 3, max: 20 })) {
    return next(new HttpError('Name must be at least 3 characters', 400))
  }

  // Validate phone number if it is passed
  if (
    phoneNumber &&
    (!validator.isMobilePhone(phoneNumber) ||
      !validator.isLength(phoneNumber, { min: 11, max: 11 }))
  ) {
    return next(new HttpError('Please enter a valid phone number', 400))
  }

  // Validate password if it is passed
  if (password && !validator.isLength(password, { min: 4, max: 50 })) {
    return next(new HttpError('Password must be at least 4 characters', 400))
  }

  // Validate city if it is passed
  if (city && !validator.isLength(city, { min: 2, max: 50 })) {
    return next(new HttpError('City must be at least 2 characters', 400))
  }

  // Validate country if it is passed
  if (country && !validator.isLength(country, { min: 2, max: 50 })) {
    return next(new HttpError('Country must be at least 2 characters', 400))
  }

  // If you wanna update phoneNumber which is unique, you have to check if it is already taken or not
  if (phoneNumber) {
    try {
      const user = await UserModel.findOne({ phoneNumber })
      if (user) {
        return next(new HttpError('Phone number already taken', 400))
      }
    } catch (err) {
      return next(new HttpError('Something went wrong, please try again', 500))
    }
  }

  try {
    const userToUpdate = (await UserModel.findById(id)) as UserMethods
    if (!userToUpdate) {
      return next(new HttpError('User not found', 404))
    }
    // Update user
    if (name) userToUpdate.name = name
    if (phoneNumber) userToUpdate.phoneNumber = phoneNumber
    if (password) userToUpdate.password = password
    if (city) userToUpdate.city = city
    if (country) userToUpdate.country = country

    const updatedUser = await userToUpdate.save()
    if (!updatedUser) {
      return next(new HttpError('Something went wrong, please try again', 500))
    }
    // Project user data
    const userData = {
      id: updatedUser.id,
      name: updatedUser.name,
      phoneNumber: updatedUser.phoneNumber,
      city: updatedUser.city,
      country: updatedUser.country,
      avatar: `${
        process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL
      }/api/v1/users/${updatedUser.id}/avatar`,
    }
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: {
        user: userData,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default update
