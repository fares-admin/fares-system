import mongoose from 'mongoose'

export enum TypeCode {
  FORGOT = 'forgot',
  LOGIN = 'login',
}

export interface ICode {
  code: string
  expired: Date
  type: TypeCode
}

export interface TInternalUserEntity {
  _id: mongoose.Types.ObjectId
  name: string
  username: string
  password: string
  email: string
  phone: string
  created: Date
  modified: Date
  token: string
  codes: ICode[]
  twoFactor: boolean
  verify: boolean
  active: boolean
}

export const InitInternalUserEntity: TInternalUserEntity = {
  _id: new mongoose.Types.ObjectId(),
  name: '',
  username: '',
  password: '',
  email: '',
  phone: '',
  created: new Date(),
  modified: new Date(),
  token: '',
  codes: [],
  twoFactor: false,
  verify: false,
  active: false,
}

export const InternalUserSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  username: String,
  password: String,
  email: String,
  phone: String,
  created: Date,
  modified: Date || null,
  codes: Array<{ code: String; expired: Date; type: TypeCode }>,
  token: String,
  twoFactor: Boolean,
  verify: Boolean,
  active: Boolean,
})
