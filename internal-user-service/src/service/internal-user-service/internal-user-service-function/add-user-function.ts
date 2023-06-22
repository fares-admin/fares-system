import {
  InitInternalUserEntity,
  TInternalUserEntity,
} from '@/src/repository/internal-user-repo/internal-user-entity'
import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { CommonResponse } from 'common-abstract-fares-system'
import { hashPassword } from 'common-lib-fares-system'
import { convertValue } from 'object-mapper-fares-system'
import { validate } from 'validation-tool-fares-system'
import { InternalUserReq, InternalUserReqError, UserValidatorSchema } from '../internal-user-dto'

/*
    @ericchen:

    put your explanation here
*/

export const addNewUserFunction = async (
  req: InternalUserReq,
  repository: InternalUserRepository
): Promise<CommonResponse<InternalUserReqError | string>> => {
  const validateRes = validate(req, UserValidatorSchema)
  if (validateRes.isError) {
    return {
      success: false,
      result: validateRes.error,
      message: 'invalidRequest',
      status: 400,
    }
  }
  const res = {
    success: false,
    message: '',
    result: {
      name: '',
      username: '',
      email: '',
      phone: '',
    },
    status: 400,
  }
  const findEmail = await repository.findOne('email', req.email)
  if (findEmail.result) {
    return {
      ...res,
      result: { ...res.result, email: 'email exited' },
    }
  }
  const findPhone = await repository.findOne('phone', req.phone)
  if (findPhone.result) {
    return {
      ...res,
      result: { ...res.result, phone: 'phone exited' },
    }
  }
  const findUsername = await repository.findOne('username', req.username)
  if (findUsername.result) {
    return {
      ...res,
      result: { ...res.result, username: 'username exited' },
    }
  }
  const entity = convertValue<TInternalUserEntity>(req, InitInternalUserEntity)
  const password = await hashPassword(process.env.DEFAULT_PASSWORD || '')
  const { error } = await repository.insert([{ ...entity, password, codes: [] }])
  if (error) {
    return {
      status: 500,
      message: error || '',
      result: '',
      success: false,
    }
  }
  return {
    status: 200,
    message: 'ok',
    result: '',
    success: true,
  }
}
