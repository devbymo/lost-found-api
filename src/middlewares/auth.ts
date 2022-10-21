import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import HttpError from '../models/httpError'

interface AuthRequest extends Request {
  userId?: string
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from the header
    const token = req.headers.authorization?.replace('Bearer ', '')

    // Check if token exists
    if (!token) {
      throw new HttpError('Authentication faild!', 401)
    }

    // Verify token
    const jwtSecret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, jwtSecret as string) as JwtPayload

    // check decoded token
    if (!decoded) {
      throw new HttpError('Authentication faild!', 401)
    }

    // Add user to the request to be used in the controller
    req.userId = decoded.userId

    // Forward the request
    next()
  } catch (error) {
    return next(new HttpError('Authentication faild!', 401))
  }
}

export default auth
