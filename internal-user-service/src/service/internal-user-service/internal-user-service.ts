import {
  InitInternalUserEntity,
  TInternalUserEntity,
} from '@/src/repository/internal-user-repo/internal-user-entity'
import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { NextApiRequest } from 'next'
import { convertValue } from 'object-mapper-fares-system'
import { validate } from 'validation-tool-fares-system'
import {
  InitInternalUserRes,
  InternalUserReq,
  InternalUserReqError,
  InternalUserRes,
  UserValidatorSchema,
} from './internal-user-dto'

export class InternalUserService extends CommonService<InternalUserRepository> {
  constructor() {
    super(new InternalUserRepository())
  }

  public async getListUsers(
    req: NextApiRequest
  ): Promise<CommonResponse<CommonListResult<InternalUserRes> | string>> {
    const { page, size } = this.getPageAndSize(req as any)
    const result = await this.repository.find(
      page,
      size,
      this.generatePipelineAggregate(req.query, InitInternalUserEntity)
    )

    return this.responseList(result, InitInternalUserRes)
  }

  private async validateUser(
    req: InternalUserReq,
    id: string,
    isUpdate?: boolean
  ): Promise<CommonResponse<InternalUserReqError> | null> {
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
    if (isUpdate && (!id || !mongoose.isValidObjectId(id))) {
      return {
        ...res,
        message: 'invalid user id',
      }
    }
    const findEmail = await this.repository.findOne('email', req.email)
    if (findEmail.result && findEmail.result._id.toString() !== id) {
      return {
        ...res,
        result: { ...res.result, email: 'email exited' },
      }
    }
    const findPhone = await this.repository.findOne('phone', req.phone)
    if (findPhone.result && findPhone.result._id.toString() !== id) {
      return {
        ...res,
        result: { ...res.result, phone: 'phone exited' },
      }
    }
    const findUsername = await this.repository.findOne('username', req.username)
    if (findUsername.result && findUsername.result._id.toString() !== id) {
      return {
        ...res,
        result: { ...res.result, username: 'username exited' },
      }
    }
    return null
  }

  public async addNewUser(
    req: InternalUserReq
  ): Promise<CommonResponse<InternalUserReqError | string>> {
    const validateRes = validate(req, UserValidatorSchema)
    if (validateRes.isError) {
      return this.genRes<InternalUserReqError>(validateRes.error, 400, 'invalidRequest', false)
    }
    const isValidUser = await this.validateUser(req, 'a')
    if (isValidUser) return isValidUser
    const entity = convertValue<TInternalUserEntity>(req, InitInternalUserEntity)
    const result = await this.repository.insert([entity])
    return this.responseVoid(result)
  }

  public async updateUser(
    req: InternalUserReq,
    id: string
  ): Promise<CommonResponse<InternalUserReqError | string>> {
    const validateRes = validate(req, UserValidatorSchema)
    if (validateRes.isError) {
      return this.genRes<InternalUserReqError>(validateRes.error, 400, 'invalidRequest', false)
    }
    const isValidUser = await this.validateUser(req, id, true)
    if (isValidUser) return isValidUser
    const findUser = await this.repository.findOne('_id', new mongoose.Types.ObjectId(id))
    if (!findUser.result) {
      return {
        success: false,
        message: 'not found user',
        result: '',
        status: 404,
      }
    }
    const result = await this.repository.update([{ ...findUser.result, ...req }])
    return this.responseVoid(result)
  }

  public async deleteUser(ids: string): Promise<CommonResponse<string>> {
    const invalidParamRes = {
      success: false,
      message: 'invalid params',
      result: '',
      status: 400,
    }
    if (!ids) {
      return invalidParamRes
    }
    const listId = ids.split(',')
    const filteredIds = listId.filter((item) => {
      if (!mongoose.isValidObjectId(item)) {
        return false
      }
      return true
    })
    if (filteredIds.length === 0) {
      return invalidParamRes
    }
    const result = await this.repository.delete(filteredIds)
    return this.responseVoid(result)
  }
}
