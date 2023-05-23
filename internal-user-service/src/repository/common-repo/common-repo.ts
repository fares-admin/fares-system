import { CommonListResult, PipelineResponse } from '@/src/shared'
import { deleteFunc, findFunc, findOneFunc, saveFunc } from './common-func-repo'

export class CommonRepository<T> {
  schema: any

  collection: string

  constructor(schema: any, collection: string) {
    this.schema = schema
    this.collection = collection
  }

  async find(page: number, size: number): Promise<PipelineResponse<CommonListResult<T>>> {
    const result = await findFunc<T>(this.schema, this.collection, [], page, size)
    return result
  }

  async findOne(field: string, value: any): Promise<PipelineResponse<T[]>> {
    const result = await findOneFunc<T>(this.schema, this.collection, value, field)
    return result
  }

  async save(entities: T[]): Promise<PipelineResponse<string>> {
    const result = await saveFunc(this.schema, this.collection, entities)
    return result
  }

  async delete(ids: string[]): Promise<PipelineResponse<string>> {
    const result = await deleteFunc(this.schema, this.collection, ids)
    return result
  }
}
