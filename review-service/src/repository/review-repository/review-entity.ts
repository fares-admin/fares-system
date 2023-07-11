import mongoose from 'mongoose'

export enum ReviewStatus {
  OFFLINE = 'offline',
  REVIEWED = 'reviewed',
}

export class Review {
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  productId: mongoose.Types.ObjectId[] = []

  variantId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  email: string = ''

  name: string = ''

  score: number = 0

  reviewer: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  status: ReviewStatus = ReviewStatus.OFFLINE
}

export const ReviewSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  targetId: Array<mongoose.Types.ObjectId>,
  email: String,
  name: String,
  score: Number,
  reviewer: mongoose.Types.ObjectId,
  status: String,
})
