import { CommonResponse, PipelineResponse } from '@/src/shared'
import mongoose from 'mongoose'

export class CommonService<T> {
  repository: T

  constructor(repo: T) {
    this.repository = repo
  }

  genRes<E>(
    result: E,
    status: number,
    message: string,
    success: boolean
  ): Promise<CommonResponse<E>> {
    return Promise.resolve({
      status,
      result,
      message,
      success,
    })
  }

  checkPipeline<E>(val: PipelineResponse<E>): Promise<CommonResponse<E | string>> {
    const { error, result } = val
    if (result) {
      return this.genRes<E>(result, 200, 'ok', true)
    }
    return this.genRes<string>('', 500, error || '', false)
  }

  convertValue<E, F>(from: E, to: F): F {
    let entity = { ...to, ...from }
    if (!entity['_id' as keyof typeof entity]) {
      entity = { ...entity, _id: new mongoose.Types.ObjectId() }
    }
    return entity
  }
}
