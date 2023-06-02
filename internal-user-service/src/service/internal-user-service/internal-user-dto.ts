import { IS_EMAIL, IS_PHONE, IS_REQUIRED, IS_USERNAME, ObjectValidator } from '@/src/lib/validation'

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

export const InitInternalUserRes = {
  _id: '',
  name: '',
  username: '',
  password: '',
  email: '',
  phone: '',
  created: new Date(),
  modified: new Date(),
  token: '',
  codeLogin: '',
  codeForgot: '',
  twoFactor: 0,
  verify: 0,
  active: 0,
}

export type InternalUserRes = typeof InitInternalUserRes
