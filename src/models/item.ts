import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [2, 'Name must be at least 2 characters'],
      maxLength: [50, 'Name must be less than 50 characters'],
      trim: true,
      require: [true, 'Name is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      minLength: [2, 'Category must be at least 2 characters'],
      maxLength: [50, 'Category must be less than 50 characters'],
      trim: true,
      toLowerCase: true,
      require: [true, 'Category is required'],
    },
    description: {
      type: String,
      minLength: [10, 'Description must be at least 2 characters'],
      maxLength: [200, 'Description must be less than 50 characters'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      minLength: [2, 'Country must be at least 2 characters'],
      maxLength: [50, 'Country must be less than 50 characters'],
      trim: true,
      toLowerCase: true,
      require: [true, 'Country is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      minLength: [2, 'City must be at least 2 characters'],
      maxLength: [50, 'City must be less than 50 characters'],
      trim: true,
      toLowerCase: true,
      require: [true, 'City is required'],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
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

const Item = mongoose.model('Item', itemSchema)

export default Item
