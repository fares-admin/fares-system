import mongoose from 'mongoose'

export const InternalUserEntity = {
  _id: mongoose.Types.ObjectId,
  name: String,
  username: String,
  password: String,
  email: String,
  phone: String,
  created: Date,
  modified: Date || null,
  token: String,
  codeLogin: String,
  codeForgot: String,
  twoFactor: Boolean,
  verify: Boolean,
  active: Boolean,
}

export type TInternalUserEntity = typeof InternalUserEntity

export const InternalUserSchema = new mongoose.Schema(InternalUserEntity)
