import mongoose from 'mongoose'
import { IS_NUMBER, IS_REQUIRED, ObjectValidator } from 'validation-tool-fares-system'

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
