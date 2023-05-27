import { convertValue } from '@/src/lib/object-mapper'
import { validate } from '@/src/lib/validation'
import {
  InitInternalUserEntity,
  TInternalUserEntity,
} from '@/src/repository/internal-user-repo/internal-user-entity'
import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { CommonListResult, CommonResponse } from '@/src/shared'
import { NextApiRequest } from 'next'
import { CommonService } from '../common-service/common-service'
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

  async getListUsers(
    req: NextApiRequest
  ): Promise<CommonResponse<CommonListResult<InternalUserRes> | string>> {
    const { page, size } = this.getPageAndSize(req)
    const result = await this.repository.find(
      page,
      size,
      this.generatePipelineAggregate(req.query, InitInternalUserEntity)
    )

    return this.responseList(result, InitInternalUserRes)
  }

  async addNewUser(req: InternalUserReq): Promise<CommonResponse<InternalUserReqError | string>> {
    const validateRes = validate(req, UserValidatorSchema)
    if (validateRes.isError) {
      return this.genRes<InternalUserReqError>(validateRes.error, 400, 'invalidRequest', false)
    }
    const entity = convertValue<TInternalUserEntity>(req, InitInternalUserEntity)
    this.repository.save([entity])
    return this.genRes<string>('success', 200, 'success', true)
  }
}
