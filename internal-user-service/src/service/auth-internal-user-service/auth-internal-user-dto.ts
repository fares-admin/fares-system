import { IS_REQUIRED, ObjectValidator } from 'validation-tool-fares-system'

export interface InternalUserLoginReq {
  username: string
  password: string
}

export const AuthUserValidatorSchema: ObjectValidator<InternalUserLoginReq> = {
  username: IS_REQUIRED,
  password: IS_REQUIRED,
}

export type AuthInternalUserReqError = Record<keyof InternalUserLoginReq, string>

export const InitInternalUserLoginRes = {
  token: '',
}
export type InternalUserLoginRes = typeof InitInternalUserLoginRes
