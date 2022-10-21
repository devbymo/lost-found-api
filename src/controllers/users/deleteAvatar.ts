import { Request, Response, NextFunction } from 'express'
import HttpError from '../../models/httpError'
import UserModel from '../../models/user'

interface AuthRequest extends Request {
  userId?: string
}

const removeAvatar = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { userId } = req

  if (!userId) {
    return next(new HttpError('You are not authenticated!', 400))
  }

  try {
    const user = await UserModel.findById(userId)
    if (!user) {
      return next(new HttpError('User does not exist', 400))
    }
    user.avatar = Buffer.alloc(0)
    await user.save()

    res.status(200).json({
      status: 'success',
      message: 'Image removed successfully',
    })
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }
}

export default removeAvatar
