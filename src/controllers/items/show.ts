import ItemModel from '../../models/item'
import { Request, Response, NextFunction } from 'express'
import HttpError from '../../models/httpError'
import validator from 'validator'

const show = async (req: Request, res: Response, next: NextFunction) => {
  const itemId = req.params.id

  // Validate the item id
  if (!itemId || !validator.isMongoId(itemId)) {
    return next(new HttpError('Invalid item id', 422))
  }

  try {
    const item = await ItemModel.findById(itemId)
    if (!item) {
      return next(new HttpError('Item not found', 404))
    }
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
      message: 'Item fetched successfully',
      data: {
        item: itemData,
      },
    })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }
}

export default show
