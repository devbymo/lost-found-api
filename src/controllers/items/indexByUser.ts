import ItemModel from '../../models/item'
import { Request, Response, NextFunction } from 'express'
import HttpError from '../../models/httpError'
import validator from 'validator'

const indexByUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id

  // Validate user id
  if (!userId || !validator.isMongoId(userId)) {
    return next(new HttpError('Invalid user id', 400))
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
    const skip = (page - 1) * limit
    const items = await ItemModel.find({ creator: userId })
      .skip(skip)
      .limit(limit)
      .sort([[sortBy, order === 'asc' ? 1 : -1]])
      .exec()

    if (!items || items.length === 0) {
      return next(new HttpError('No items found', 404))
    }
    res.status(200).json({
      status: 'success',
      message: 'Items fetched successfully',
      data: {
        items: items.map((item) => {
          return {
            ...item.toObject({ getters: true }),
            image: `${
              process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL
            }/api/v1/items/${item.id}/image`,
          }
        }),
      },
    })
  } catch (err) {
    return next(new HttpError('Something went wrong' + err, 500))
  }
}

export default indexByUser
