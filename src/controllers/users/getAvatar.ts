import { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import HttpError from '../../models/httpError'
import UserModel from '../../models/user'

interface AuthRequest extends Request {
  userId?: string
}

const getAvatar = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.params.id

  // Validate the user id
  if (!userId || !validator.isMongoId(userId)) {
    return next(new HttpError('Invalid user id', 422))
  }

  try {
    const user = await UserModel.findById(userId)
    if (!user) {
      return next(new HttpError('User does not exist', 400))
    }

    if (!user.avatar.toString('base64')) {
      return next(new HttpError('User does not have an avatar', 400))
    }
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }
}

export default getAvatar
