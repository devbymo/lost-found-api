import app from './app'
import * as dotenv from 'dotenv'
import connectMongoDB from './db/mongoose'

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  connectMongoDB()
  console.log(`Server running on port ${PORT}`)
})
