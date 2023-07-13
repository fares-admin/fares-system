import mongoose from 'mongoose'

export class PublicReviewRes {
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  productId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  variantId: mongoose.Types.ObjectId[] = []

  email: string = ''

  name: string = ''

  score: number = 0

  reviewer: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  created: Date = new Date()
}
