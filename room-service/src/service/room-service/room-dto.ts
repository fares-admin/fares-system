import mongoose from 'mongoose'
import { IS_REQUIRED, ObjectValidator, IS_NUMBER } from 'validation-tool-fares-system'

export interface RoomReq {
  productId: mongoose.Types.ObjectId
  title: string
  size: number
  maxPersons: number
  price: number
  salePrices: number
  image: string
}

export const RoomValidatorSchema: ObjectValidator<RoomReq> = {
  productId: IS_REQUIRED,
  title: IS_REQUIRED,
  size: IS_NUMBER,
  maxPersons: IS_NUMBER,
  price: IS_NUMBER,
  salePrices: IS_NUMBER,
  image: IS_REQUIRED,
}

export type RoomReqError = Record<keyof RoomReq, string>

export interface RoomRes {
  _id: string
  title: string
  size: number
  maxPersons: number
  price: number
  salePrices: number
  image: string
  created: Date
  modified: Date
  active: boolean
  // to do
  product: any
}
export const InitRoomRes: RoomRes = {
  _id: '',
  // to do
  product: '',
  title: '',
  size: 0,
  maxPersons: 0,
  price: 0,
  salePrices: 0,
  image: '',
  created: new Date(),
  modified: new Date(),
  active: true,
}
