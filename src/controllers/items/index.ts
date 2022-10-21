import ItemModel from '../../models/item'
import { Request, Response, NextFunction } from 'express'
import HttpError from '../../models/httpError'
import validator from 'validator'

const index = async (req: Request, res: Response, next: NextFunction) => {
  // Validate category if passed
  const validCategories = ['mobile', 'laptop', 'keys', 'id', 'document', 'money', 'other']
  if (req.body.category && !validator.isIn(req.body.category.toLowerCase(), validCategories)) {
    return next(new HttpError('Invalid category passed', 400))
  }

  // Validate country if passed
  if (req.body.country && !validator.isLength(req.body.country, { min: 2, max: 50 })) {
    return next(new HttpError('Country must be at least 2 characters', 400))
  }

  // Validate city if passed
  if (req.body.city && !validator.isLength(req.body.city, { min: 2, max: 50 })) {
    return next(new HttpError('City must be at least 2 characters', 400))
  }

  // Validate name if passed
  if (req.body.name && !validator.isLength(req.body.name, { min: 2, max: 50 })) {
    return next(new HttpError('Name must be at least 2 characters', 400))
  }

  // Validaet page number
  const page = req.query.page ? parseInt(req.query.page as string) : 1
  if (isNaN(page) || page < 1) {
    return next(new HttpError('Invalid page number', 400))
  }

  // Validate limit
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 5
  if (isNaN(limit) || limit < 1) {
    return next(new HttpError('Invalid limit', 400))
  }

  // Validate sort
  const sortBy = req.query.sortBy ? (req.query.sort as string) : 'createdAt'
  const validSorts = ['createdAt', 'updatedAt']
  if (!validator.isIn(sortBy, validSorts)) {
    return next(new HttpError(`Invalid sort passed, valid sorts ${validSorts}`, 400))
  }

  // Validate order
  const order = req.query.order ? (req.query.order as string) : 'desc' // recently created items first
  const validOrders = ['asc', 'desc']
  if (!validator.isIn(order, validOrders)) {
    return next(new HttpError(`Invalid order passed, valid orders ${validOrders}`, 400))
  }

  try {
    // Get items
    let items = []
    // If body is empty, get all items sorted by date created (default)
    if (req.body.category || req.body.country || req.body.city || req.body.name) {
      items = await ItemModel.find({
        ...(req.body.category && { category: req.body.category.toLowerCase() }),
        ...(req.body.country && { country: req.body.country.toLowerCase() }),
        ...(req.body.city && { city: req.body.city.toLowerCase() }),
      })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort([[sortBy, order === 'asc' ? 1 : -1]])
    } else {
      items = await ItemModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort([[sortBy, order === 'asc' ? 1 : -1]])
    }

    if (!items || items.length === 0) {
      return next(new HttpError('No items found', 404))
    }
    res.status(200).json({
      status: 'success',
      message: 'Items fetched successfully',
      data: {
        items: items.map((item) => {
          return {
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
        }),
      },
    })
  } catch (err) {
    return next(new HttpError('Something went wrong' + err, 500))
  }
}

export default index
