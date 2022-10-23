import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const NODE_ENV = process.env.NODE_ENV
let DB_HOST = process.env.DB_HOST_PROD
if (NODE_ENV === 'test') {
  DB_HOST = process.env.DB_HOST_TEST
} else if (NODE_ENV === 'dev') {
  DB_HOST = process.env.DB_HOST_DEV
} else {
  DB_HOST = process.env.DB_HOST_PROD
}
console.log(DB_HOST)
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.uz8vm7a.mongodb.net/${DB_HOST}?retryWrites=true&w=majority`

const connectMongoDB = async () => {
  try {
    await mongoose.connect(url)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
  }
}

export default connectMongoDB
