import { ProductEntity } from '@/src/repository/product-repository/product-entity'
import { ProductRepository } from '@/src/repository/product-repository/product-repository'
import { CommonListResult, CommonResponse, PipelineResponse } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { NextApiRequest } from 'next'
import { PrivateProductRes } from '../product-private-res'
import { PublicProductRes } from '../product-public-res'

/*
      @ericchen:
  
      put your explanation here
  */

export const getListProductFunc = async (
  req: NextApiRequest,
  repository: ProductRepository,
  getPageAndSize: (req: {
    query: {
      page: number
      size: number
    }
  }) => {
    page: number
    size: number
  },
  generatePipelineAggregate: (params: object, entity: ProductEntity) => mongoose.PipelineStage[],
  responseList: (
    result: PipelineResponse<CommonListResult<ProductEntity>>,
    res: PublicProductRes | PrivateProductRes
  ) => Promise<CommonResponse<CommonListResult<PublicProductRes | PrivateProductRes> | string>>,
  isAuth: boolean
): Promise<CommonResponse<CommonListResult<PublicProductRes | PrivateProductRes> | string>> => {
  const { page, size } = getPageAndSize(req as any)
  const result = await repository.find(
    page,
    size,
    generatePipelineAggregate(req.query, new ProductEntity())
  )
  if (isAuth) {
    return await responseList(result, new PrivateProductRes())
  }
  return await responseList(result, new PublicProductRes())
}
