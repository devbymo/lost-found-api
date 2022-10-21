import multer from 'multer'
import { v4 as uuidGenerator } from 'uuid'
import HttpError from '../models/httpError'

const upload = multer({
  // Use this if you want to store the file in the server
  // If you wanna store the file in the DB instead, use file.buffer
  // storage: multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, 'uploads')
  //   },
  //   filename: (req, file, cb) => {
  //     const imageName = `${uuidGenerator()}-${file.originalname}`
  //     cb(null, imageName)
  //   },
  // }),
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(null, true)
    } else {
      cb(new HttpError('Please upload an image, accept (png, jpg, jpeg)', 400))
    }
  },
})

export default upload
