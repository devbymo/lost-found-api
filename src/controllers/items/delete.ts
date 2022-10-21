import ItemModel from '../../models/item'
import Item from '../../types/item'
import { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import HttpError from '../../models/httpError'
import mongoose from 'mongoose'
import UserModel from '../../models/user'

interface AuthRequest extends Request {
  userId?: string
}

const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const itemId = req.params.id
  const userId = req.userId

  // Validate the item id
  if (!itemId || !validator.isMongoId(itemId)) {
    return next(new HttpError('Invalid item id', 422))
  }

  // Find item creator
  let user
  try {
    user = await UserModel.findById(userId)
    if (!user) {
      return next(new HttpError('Item creator does not exist', 404))
    }
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }

  // Find the item
  try {
    const item = (await ItemModel.findById(itemId)) as Item

    if (!item) {
      return next(new HttpError('Item not found', 404))
    }

    if (item.creator.toString() !== userId) {
      return next(new HttpError('You are not allowed to delete this item', 403))
    }

    // Open new session using transaction
    const session = await mongoose.startSession()
    session.startTransaction()
    // Delete the item
    await item.remove({ session })
    // Delete item from user's items
    const userItems = user.items.filter((item) => item.toString() !== itemId)
    user.items = userItems
    await user.save({ session })
    // Commit the transaction
    await session.commitTransaction()
    // Close the session
    session.endSession()

    res.status(200).json({
      status: 'success',
      message: 'Item deleted successfully',
    })
  } catch (err) {
    return next(new HttpError('Something went wrong', 500))
  }
}

export default remove
