import mongoose from 'mongoose'

export enum ReviewStatus {
  OFFLINE = 'offline',
  REVIEWED = 'reviewed',
}

export const InitReviewEntity = {
  _id: new mongoose.Types.ObjectId(),
  targetId: [new mongoose.Types.ObjectId()],
  email: '',
  name: '',
  score: 0,
  reviewer: new mongoose.Types.ObjectId(),
  status: ReviewStatus.OFFLINE,
}

export type TReviewEntity = typeof InitReviewEntity

export const ReviewSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  targetId: Array<mongoose.Types.ObjectId>,
  email: String,
  name: String,
  score: Number,
  reviewer: mongoose.Types.ObjectId,
  status: String,
})
