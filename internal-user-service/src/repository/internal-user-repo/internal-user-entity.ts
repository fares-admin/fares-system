import mongoose from 'mongoose'

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
  token: String,
  twoFactor: Boolean,
  verify: Boolean,
  active: Boolean,
})
