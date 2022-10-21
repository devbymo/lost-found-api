import { Request, Response, NextFunction } from 'express'
import HttpError from '../../models/httpError'
import UserModel from '../../models/user'
import sharp from 'sharp'

interface AuthRequest extends Request {
  userId?: string
}

const uploadAvatar = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { userId } = req
  // Validate file existence
  if (!req.file) {
    return next(new HttpError('Unable to upload image', 400))
  }
  // Find the user
  try {
    const user = await UserModel.findById(userId)
    if (!user) {
      return next(new HttpError('User does not exist', 400))
    }
    // Normalize the image
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 720, height: 720 })
      .webp({ quality: 20 })
      .toBuffer()
    // Add the avatar to the user
    const image = buffer
    user.avatar = image
    await user.save()

    res.status(201).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        avatar: `${
          process.env.NODE_ENV === 'env' ? process.env.DEV_URL : process.env.PROD_URL
        }/api/v1/users/${user.id}/avatar`,
      },
    })
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again', 500))
  }
}

export default uploadAvatar
