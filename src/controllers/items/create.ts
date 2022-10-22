import ItemModel from '../../models/item'
import { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import HttpError from '../../models/httpError'
import UserModel from '../../models/user'
import mongoose from 'mongoose'

interface AuthRequest extends Request {
  userId?: string
}

const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { name, category, description, country, city, creator } = req.body
  const requiredFields = ['name', 'category', 'country', 'city', 'creator']

  // Validate creator
  if (!creator || !validator.isMongoId(creator)) {
    return next(new HttpError('Invalid creator id', 422))
  }

  // Validate authenticated user
  if (req.userId !== creator) {
    return next(new HttpError('You are not allowed to create items for other users', 401))
  }

  // Validate required fields
  if (!name || !category || !country || !city || !creator) {
    return next(new HttpError(`Missing required fields ${requiredFields}`, 400))
  }

  // Validate name
  if (!validator.isLength(name, { min: 2, max: 50 })) {
    return next(new HttpError('Name must be at least 2 characters', 400))
  }

  // Validate category
  const validCategories = [
    'mobile',
    'laptop',
    'keys',
    'id',
    'document',
    'money',
    'tablet',
    'watch',
    'camera',
    'other',
  ]
  if (!validator.isIn(category.toLowerCase(), validCategories)) {
    return next(new HttpError(`Invalid category passed, valid categories ${validCategories}`, 400))
  }

  // Validate country
  if (!validator.isLength(country, { min: 2, max: 20 })) {
    return next(new HttpError('Country must be at least 2 characters', 400))
  }

  // Validate city
  if (!validator.isLength(city, { min: 2, max: 20 })) {
    return next(new HttpError('City must be at least 2 characters', 400))
  }

  // Validate description
  if (description && !validator.isLength(description, { min: 10, max: 200 })) {
    return next(new HttpError('Description must be at least 10 characters', 400))
  }

  // Create new item
  const newItem = new ItemModel({
    name,
    category: category.toLowerCase(),
    description,
    country: country.toLowerCase(),
    city: city.toLowerCase(),
    creator,
  })

  let user
  try {
    user = await UserModel.findById(creator)
    if (!user) {
      return next(new HttpError('Invalid creator id', 404))
    }
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }

  // Save new item & update user's items (sesssion & transaction)
  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    // Save new item
    const item = await newItem.save({ session })
    // Add new item to user's items
    user.items.push(newItem.id)
    await user.save({ session })
    await session.commitTransaction()
    session.endSession()

    res.status(201).json({
      status: 'success',
      message: 'Item created successfully',
      data: {
        item: {
          ...item.toObject({ getters: true }),
          image: `${
            process.env.NODE_ENV === 'prod' ? process.env.PROD_URL : process.env.DEV_URL
          }/api/v1/items/${item.id}/image`,
        },
      },
    })
  } catch (err) {
    return next(new HttpError('Creating item failed, please try again', 500))
  }
}

export default create
