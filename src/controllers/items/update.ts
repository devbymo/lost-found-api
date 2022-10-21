import ItemModel from '../../models/item'
import { Request, Response, NextFunction } from 'express'
import HttpError from '../../models/httpError'
import validator from 'validator'
import Item from '../../types/item'

interface AuthRequest extends Request {
  userId?: string
}

const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const itemId = req.params.id
  const userId = req.userId
  const { name, description, category, city, country } = req.body

  // Check if there is invalid fields in the request body
  const allowedFields = ['name', 'description', 'category', 'city', 'country']
  const fields = Object.keys(req.body)
  const isValidOperation = fields.every((field) => allowedFields.includes(field))
  if (!isValidOperation) {
    return next(new HttpError(`Invalid fields passed allowed fields [${allowedFields}]`, 400))
  }

  // Validate the item id
  if (!itemId || !validator.isMongoId(itemId)) {
    return next(new HttpError('Invalid item id', 422))
  }

  // Validate the user id
  if (!userId || !validator.isMongoId(userId)) {
    return next(new HttpError('Invalid user id', 422))
  }

  // Validate the name
  if (name && !validator.isLength(name, { min: 2, max: 50 })) {
    return next(new HttpError('Invalid name', 422))
  }

  // Validate the description
  if (description && !validator.isLength(description, { min: 10, max: 200 })) {
    return next(new HttpError('Invalid description', 422))
  }

  // Validate category
  const validCategories = ['mobile', 'laptop', 'keys', 'id', 'document', 'money', 'other']
  if (category && !validator.isIn(category, validCategories)) {
    return next(
      new HttpError(`Invalid category passed, valid categories [${validCategories}]`, 400)
    )
  }

  // Validate the city
  if (city && !validator.isLength(city, { min: 2, max: 50 })) {
    return next(new HttpError('Invalid city', 422))
  }

  // Validate the country
  if (country && !validator.isLength(country, { min: 2, max: 50 })) {
    return next(new HttpError('Invalid country', 422))
  }

  try {
    // Get the item
    const item = (await ItemModel.findById(itemId)) as Item
    if (!item) {
      return next(new HttpError('Item not found', 404))
    }

    // Validate creator
    if (item.creator.toString() !== userId) {
      return next(new HttpError('You are not allowed to update this item', 401))
    }

    // Update the item's fields if they are different & exist
    if (name && name !== item.name) {
      item.name = name
    }
    if (description && description !== item.description) {
      item.description = description
    }
    if (category && category !== item.category) {
      item.category = category
    }
    if (city && city !== item.city) {
      item.city = city
    }
    if (country && country !== item.country) {
      item.country = country
    }
    await item.save()

    // Project the item
    const itemData = {
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      country: item.country,
      city: item.city,
      creator: item.creator,
      image: `${
        process.env.NODE_ENV === 'env' ? process.env.DEV_URL : process.env.PROD_URL
      }/api/v1/items/${item.id}/image`,
    }
    res.status(200).json({
      status: 'success',
      message: 'Item updated successfully',
      data: {
        item: itemData,
      },
    })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }
}

export default update
