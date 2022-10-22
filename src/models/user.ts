import mongoose from 'mongoose'
import User from '../types/user'
import hashingPassword from '../utils/passwordHashing'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [2, 'Name must be at least 2 characters'],
      maxLength: [20, 'Name must be less than 20 characters'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      minLength: [11, 'Phone number must be at least 10 characters'],
      maxLength: [11, 'Phone number must be less than 12 characters'],
      trim: true,
      unique: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      minLength: [2, 'Country must be at least 2 characters'],
      maxLength: [20, 'Country must be less than 20 characters'],
      trim: true,
      toLowerCase: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      minLength: [2, 'City must be at least 2 characters'],
      maxLength: [20, 'City must be less than 20 characters'],
      trim: true,
      toLowerCase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [4, 'Password must be at least 4 characters'],
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    avatar: {
      type: Buffer,
      default: Buffer.alloc(0),
    },
  },
  {
    timestamps: true,
  }
)

// Model Methods

// Model Instance Methods

// Model Middlewares
// Auto hash password before saving
interface ModifiedUser extends User {
  isModified: (field: string) => boolean
}

userSchema.pre('save', async function (next) {
  const user = this as unknown as ModifiedUser
  if (user.isModified('password')) {
    const password = `${user.password}`
    user.password = await hashingPassword(password)
  }
  next()
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
