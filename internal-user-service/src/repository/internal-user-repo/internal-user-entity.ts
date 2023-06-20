import mongoose from 'mongoose'

export enum TypeCode {
  FORGOT = 'forgot',
  LOGIN = 'login',
}

export const InitInternalUserEntity = {
  _id: new mongoose.Types.ObjectId(),
  name: '',
  username: '',
  password: '',
  email: '',
  phone: '',
  created: new Date(),
  modified: new Date(),
  token: '',
  codes: [
    {
      code: '',
      expired: new Date(),
      type: TypeCode.FORGOT,
    },
  ],
  twoFactor: false,
  verify: false,
  active: false,
}

export type TInternalUserEntity = typeof InitInternalUserEntity

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
