import { Request, Response, NextFunction } from 'express'
import validator from 'validator'
import HttpError from '../../models/httpError'
import UserModel from '../../models/user'

const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  // validate id is a valid mongo id before querying database
  if (!validator.isMongoId(id)) {
    return next(new HttpError('Invalid ID', 400))
  }

  try {
    const user = await UserModel.findById(id).populate('items').select('-password')
    if (!user) {
      return next(new HttpError('User does not exist', 400))
    }

    // Project user data
    const userData = {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      city: user.city,
      country: user.country,
      avatar: `${
        process.env.NODE_ENV === 'prod' ? process.env.PROD_URL : process.env.DEV_URL
      }/api/v1/users/${user.id}/avatar`,
    }
    res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: {
        user: userData,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default show
