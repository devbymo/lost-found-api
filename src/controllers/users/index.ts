import { Request, Response, NextFunction } from 'express'
import HttpError from '../../models/httpError'
import UserModel from '../../models/user'

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.find()
    if (!users || users.length === 0) {
      return next(new HttpError('No users found', 404))
    }
    // Project the users
    const usersData = users.map((user) => ({
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      city: user.city,
      country: user.country,
      avatar: `${
        process.env.NODE_ENV === 'env' ? process.env.DEV_URL : process.env.PROD_URL
      }/api/v1/users/${user.id}/avatar`,
    }))
    res.status(200).json({
      status: 'success',
      message: 'Users retrieved successfully',
      data: {
        users: usersData,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default index
