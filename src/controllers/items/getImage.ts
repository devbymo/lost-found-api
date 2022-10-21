import { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import HttpError from '../../models/httpError'
import ItemModel from '../../models/item'
import Item from '../../types/item'

interface AuthRequest extends Request {
  userId?: string
}

const getAvatar = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const itemId = req.params.id

  // Validate the user id
  if (!itemId || !validator.isMongoId(itemId)) {
    return next(new HttpError('Invalid item id', 422))
  }

  try {
    const item = (await ItemModel.findById(itemId)) as Item
    if (!item) {
      return next(new HttpError('Item does not exist', 400))
    }

    if (!item.image?.toString('base64')) {
      return next(new HttpError('Item does not have an image', 400))
    }
    res.set('Content-Type', 'image/png')
    res.send(item.image)
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }
}

export default getAvatar
