import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { CommonResponse } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { validate } from 'validation-tool-fares-system'
import { InternalUserReq, InternalUserReqError, UserValidatorSchema } from '../internal-user-dto'

/*
    @ericchen:

    put your explanation here
*/

export const updateUserFunction = async (
  req: InternalUserReq,
  id: string,
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
  if (!id || !mongoose.isValidObjectId(id)) {
    return {
      ...res,
      message: 'invalid user id',
    }
  }
  const findEmail = await repository.findOne('email', req.email)
  if (findEmail.result && findEmail.result._id.toString() !== id) {
    return {
      ...res,
      result: { ...res.result, email: 'email exited' },
    }
  }
  const findPhone = await repository.findOne('phone', req.phone)
  if (findPhone.result && findPhone.result._id.toString() !== id) {
    return {
      ...res,
      result: { ...res.result, phone: 'phone exited' },
    }
  }
  const findUsername = await repository.findOne('username', req.username)
  if (findUsername.result && findUsername.result._id.toString() !== id) {
    return {
      ...res,
      result: { ...res.result, username: 'username exited' },
    }
  }
  const findUser = await repository.findOne('_id', new mongoose.Types.ObjectId(id))
  if (!findUser.result) {
    return {
      success: false,
      message: 'not found user',
      result: '',
      status: 404,
    }
  }
  const { error } = await repository.update([{ ...findUser.result, ...req }])
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
