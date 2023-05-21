import logger from '@/src/lib/logger'
import { PipelineStage } from 'mongoose'
import { connect } from '../../lib/mongodb'
import { CommonRepositoryRes } from './common-repo-type'

export async function findFunc<T>(
  schema: any,
  keySchema: string,
  pipelines: PipelineStage[],
  pageProp: number,
  sizeProp: number
): Promise<
  CommonRepositoryRes<{
    data: T[]
    total: number
    page: number
    size: number
  }>
> {
  const { result, error } = await connect(schema, keySchema)
  if (error) {
    return {
      error,
    }
  }
  if (result) {
    const { data } = result
    let page = 1
    let size = 10
    if (pageProp) {
      page = pageProp
    }
    if (sizeProp) {
      size = sizeProp
    }
    try {
      const thisResult = await data.aggregate([
        ...pipelines,
        {
          $facet: {
            metadata: [
              {
                $count: 'total',
              },
            ],
            data: [{ $skip: page - 1 }, { $limit: size }],
          },
        },
      ])
      return {
        result: {
          data: thisResult[0].data,
          total: thisResult[0].metadata[0].total,
          page,
          size,
        },
      }
    } catch (error: any) {
      logger.error([error.message])
      return {
        error: error.message,
      }
    }
  }
  return {
    error: 'no result',
  }
}

export async function findOneFunc<T>(
  schema: any,
  keySchema: string,
  value: any,
  field: string
): Promise<CommonRepositoryRes<T[]>> {
  const { result, error } = await connect(schema, keySchema)
  if (error) {
    return {
      error,
    }
  }
  if (result) {
    const { data } = result
    try {
      const thisResult = (await data.aggregate([
        {
          $match: {
            [`${field}`]: value,
          },
        },
      ])) as T[]
      return {
        result: thisResult,
      }
    } catch (error: any) {
      logger.error([error.message])
      return {
        error: error.message,
      }
    }
  }
  return {
    error: 'no result',
  }
}

export async function saveFunc<T>(
  schema: any,
  keySchema: string,
  entities: T[]
): Promise<CommonRepositoryRes<string>> {
  const { result, error } = await connect(schema, keySchema)
  if (error) {
    return {
      error,
    }
  }
  if (result) {
    const { data } = result
    try {
      // eslint-disable-next-line new-cap
      await data.bulkSave(entities.map((item) => new data(item)))
      return {
        result: 'success',
      }
    } catch (error: any) {
      logger.error([error.message])
      return {
        error: error.message,
      }
    }
  }
  return {
    error: 'no result',
  }
}

export async function deleteFunc(
  schema: any,
  keySchema: string,
  ids: string[]
): Promise<CommonRepositoryRes<string>> {
  const { result, error } = await connect(schema, keySchema)
  if (error) {
    return {
      error,
    }
  }
  if (result) {
    const { data } = result
    try {
      await data.deleteMany({
        $or: ids.map((thisId) => {
          return {
            _id: thisId,
          }
        }),
      })
      return {
        result: 'success',
      }
    } catch (error: any) {
      logger.error([error.message])
      return {
        error: error.message,
      }
    }
  }
  return {
    error: 'no result',
  }
}
