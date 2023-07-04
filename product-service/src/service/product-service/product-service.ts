import { ProductRepository } from '@/src/repository/product-repository/product-repository'
import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import { NextApiRequest } from 'next'
import { PrivateProductRes, PublicProductRes } from './product-service-dto'
import { getListProductFunc } from './product-service-function'

export class ProductService extends CommonService<ProductRepository> {
  constructor() {
    super(new ProductRepository())
  }

  public async getListProducts(
    req: NextApiRequest,
    isAuth: boolean
  ): Promise<CommonResponse<CommonListResult<PublicProductRes | PrivateProductRes> | string>> {
    return await getListProductFunc(
      req,
      this.repository,
      this.getPageAndSize,
      this.generatePipelineAggregate,
      this.responseList,
      isAuth
    )
  }
}
