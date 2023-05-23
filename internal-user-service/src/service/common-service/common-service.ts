import { CommonResponse, PipelineResponse } from '@/src/shared'

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
}
