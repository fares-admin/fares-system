import mongoose from 'mongoose'

export const InitRoomEntity: IRoomEntity = {
  _id: new mongoose.Types.ObjectId(),
  productId: new mongoose.Types.ObjectId(),
  title: '',
  size: 0,
  maxPersons: 0,
  price: 0,
  salePrices: 0,
  image: '',
  active: true,
}

export interface IRoomEntity {
  _id: mongoose.Types.ObjectId
  productId: mongoose.Types.ObjectId
  title: string
  size: number
  maxPersons: number
  price: number
  salePrices: number
  image: string
  active: boolean
}

export const RoomSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  productId: mongoose.Types.ObjectId,
  title: String,
  size: Number,
  maxPersons: Number,
  price: Number,
  salePrices: Number,
  image: String,
  active: Boolean,
})
