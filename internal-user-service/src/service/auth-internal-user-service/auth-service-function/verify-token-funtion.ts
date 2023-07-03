import {
  InitInternalUserEntity,
  TInternalUserEntity,
} from '@/src/repository/internal-user-repo/internal-user-entity'
import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { CommonResponse } from 'common-abstract-fares-system'
import { validateServiceToken, validateUserToken } from 'common-lib-fares-system'
import { convertValue } from 'object-mapper-fares-system'
/*
    @ericchen:

    put your explanation here
*/
export const verifyTokenFunction = async (
  userToken: string,
  serviceToken: string,
  repository: InternalUserRepository
): Promise<CommonResponse<TInternalUserEntity | string>> => {
  try {
    const { serviceName } = validateServiceToken(serviceToken)
    if (!serviceName) {
      return {
        status: 500,
        message: 'invalid token',
        success: false,
        result: '',
      }
    }
    const serviceAccess = [process.env.ACCESS_SCOPE]
    if (!serviceAccess.includes(serviceName)) {
      return {
        status: 500,
        message: 'no access',
        success: false,
        result: '',
      }
    }
  } catch (err) {
    return {
      status: 500,
      message: String(err),
      success: false,
      result: '',
    }
  }
  try {
    const decoded = validateUserToken(userToken)
    if (!decoded || !decoded.userId) {
      return {
        status: 401,
        message: 'invalid token',
        success: false,
        result: '',
      }
    }
    const findUser = await repository.findOne('_id', decoded.userId)
    if (findUser.error) {
      return {
        status: 401,
        message: String(findUser.error),
        success: false,
        result: '',
      }
    }
    if (!findUser.result) {
      return {
        status: 401,
        message: 'invalid user',
        success: false,
        result: '',
      }
    }
    if (findUser.result.token !== userToken) {
      return {
        status: 401,
        message: 'invalid user',
        success: false,
        result: '',
      }
    }
    return convertValue(findUser.result, InitInternalUserEntity)
  } catch (err) {
    return {
      status: 401,
      message: String(err),
      success: false,
      result: '',
    }
  }
}
