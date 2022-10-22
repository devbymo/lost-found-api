import { Request, Response, NextFunction } from 'express'
import ItemModel from '../../models/item'
import Item from '../../types/item'
import HttpError from '../../models/httpError'
import validator from 'validator'
import sharp from 'sharp'

interface AuthRequest extends Request {
  userId?: string
}

const uploadImage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const itemId = req.params.id
  const { userId } = req
  // Validate file existence
  if (!req.file) {
    return next(new HttpError('Unable to upload image', 400))
  }
  // Validate the item id
  if (!itemId || !validator.isMongoId(itemId)) {
    return next(new HttpError('Invalid item id', 422))
  }

  // Find the item
  try {
    const item = (await ItemModel.findById(itemId)) as Item

    if (!item) {
      return next(new HttpError('Item not found', 404))
    }

    // Validate that this item's id belongs to the authenticated user
    if (item.creator.toString() !== userId) {
      return next(new HttpError('You are not allowed to update this item', 403))
    }
    // Normalize the image
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 720, height: 720 })
      .webp({ quality: 20 })
      .toBuffer()
    // Add the image to the item
    const image = buffer
    item.image = image
    await item.save()

    res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        image: `${
          process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL
        }/api/v1/items/${item.id}/image`,
      },
    })
  } catch (err) {
    return next(new HttpError(`something went wrong, please try again ${err}`, 500))
  }
}

export default uploadImage
