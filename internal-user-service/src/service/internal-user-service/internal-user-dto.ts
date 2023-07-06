import {
  IS_EMAIL,
  IS_PHONE,
  IS_REQUIRED,
  IS_USERNAME,
  ObjectValidator,
} from 'validation-tool-fares-system'

export interface InternalUserReq {
  name: string
  username: string
  email: string
  phone: string
}

export const UserValidatorSchema: ObjectValidator<InternalUserReq> = {
  name: IS_REQUIRED,
  username: IS_USERNAME,
  phone: IS_PHONE,
  email: IS_EMAIL,
}

export type InternalUserReqError = Record<keyof InternalUserReq, string>

export interface InternalUserRes {
  _id: string
  name: string
  username: string
  email: string
  phone: string
  created: Date
  modified: Date
  twoFactor: boolean
  verify: boolean
  active: boolean
}
export const InitInternalUserRes: InternalUserRes = {
  _id: '',
  name: '',
  username: '',
  email: '',
  phone: '',
  created: new Date(),
  modified: new Date(),
  twoFactor: true,
  verify: true,
  active: true,
}
