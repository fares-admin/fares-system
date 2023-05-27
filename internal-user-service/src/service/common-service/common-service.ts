import { convertValue } from '@/src/lib/object-mapper'
import { CommonListResult, CommonResponse, PipelineResponse } from '@/src/shared'

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

  responseList<E, F>(
    val: PipelineResponse<CommonListResult<E>>,
    initRes: F
  ): Promise<CommonResponse<CommonListResult<F> | string>> {
    const { error, result } = val
    if (result) {
      return this.genRes<CommonListResult<F>>(
        { ...result, data: result.data.map((item) => convertValue(item, initRes)) },
        200,
        'ok',
        true
      )
    }
    return this.genRes<string>('', 500, error || '', false)
  }
}
