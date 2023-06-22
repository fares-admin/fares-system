import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import { NextApiRequest } from 'next'
import { InternalUserReq, InternalUserReqError, InternalUserRes } from './internal-user-dto'
import {
  addNewUserFunction,
  deleteUserFunction,
  getListUsersFunc,
  updateUserFunction,
} from './internal-user-service-function'

export class InternalUserService extends CommonService<InternalUserRepository> {
  constructor() {
    super(new InternalUserRepository())
  }

  public async getListUsers(
    req: NextApiRequest
  ): Promise<CommonResponse<CommonListResult<InternalUserRes> | string>> {
    return await getListUsersFunc(
      req,
      this.repository,
      this.getPageAndSize,
      this.generatePipelineAggregate,
      this.responseList
    )
  }

  public async addNewUser(
    req: InternalUserReq
  ): Promise<CommonResponse<InternalUserReqError | string>> {
    return await addNewUserFunction(req, this.repository)
  }

  public async updateUser(
    req: InternalUserReq,
    id: string
  ): Promise<CommonResponse<InternalUserReqError | string>> {
    return await updateUserFunction(req, id, this.repository)
  }

  public async deleteUser(ids: string): Promise<CommonResponse<string>> {
    return await deleteUserFunction(ids, this.repository)
  }
}
