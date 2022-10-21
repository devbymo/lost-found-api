import { Request, Response, NextFunction } from 'express'
import UserModel from '../../models/user'
import validator from 'validator'
import HttpError from '../../models/httpError'
import ItemModel from '../../models/item'
import mongoose from 'mongoose'

interface AuthRequest extends Request {
  userId?: string
}

const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params

  // validate id is a valid mongo id before querying database
  if (!validator.isMongoId(id)) {
    return next(new HttpError('Invalid ID', 400))
  }

  // validate authenticated user
  if (req.userId !== id) {
    return next(new HttpError('You are not allowed to delete other users', 401))
  }

  // Check if user exists
  try {
    const user = await UserModel.findById(id)
    if (!user) {
      return next(new HttpError('User does not exist', 400))
    }

    // Open new session using transaction
    const session = await mongoose.startSession()
    session.startTransaction()
    // Delete the user
    await user.remove({ session })
    // Delete user's items
    await ItemModel.deleteMany({ creator: id }, { session })
    // Commit the transaction
    await session.commitTransaction()
    // Close the session
    session.endSession()

    res.status(200).json({ status: 'success', message: 'User deleted successfully' })
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }
}

export default remove
