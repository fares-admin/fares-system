import {
  InitInternalUserEntity,
  TInternalUserEntity,
} from '@/src/repository/internal-user-repo/internal-user-entity'
import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { PipelineResponse } from '@/src/shared'
import mongoose from 'mongoose'
import { InternalUserReq } from './internal-user-dto'

export class InternalUserService {
  repository: InternalUserRepository = new InternalUserRepository()

  async getListUsers(): Promise<
    PipelineResponse<{
      data: TInternalUserEntity[]
      page: number
      size: number
      total: number
    }>
  > {
    const result = await this.repository.find(1, 10)
    return result
  }

  async addNewUser(req: InternalUserReq): Promise<PipelineResponse<string>> {
    const entity = Object.assign(InitInternalUserEntity, {
      ...req,
      _id: new mongoose.Types.ObjectId(),
    })
    const result = await this.repository.save([entity])
    return result
  }
}
