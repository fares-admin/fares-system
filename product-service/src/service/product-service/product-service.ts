import { ProductEntity } from '@/src/repository/product-repository/product-entity'
import { ProductRepository } from '@/src/repository/product-repository/product-repository'
import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import { NextApiRequest } from 'next'
import { PrivateProductRes } from './product-private-res'
import { PublicProductRes } from './product-public-res'
import { ProductRequest, ProductRequestError } from './product-req'
import {
  addNewProductFunction,
  deleteProductFunction,
  findInternalProductFunction,
  getListProductFunc,
  updateProductFunction,
} from './product-service-function'

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

  public async addNewProduct(
    req: ProductRequest
  ): Promise<CommonResponse<ProductRequestError | string>> {
    return await addNewProductFunction(req, this.repository)
  }

  public async deleteProduct(ids: string): Promise<CommonResponse<string>> {
    return await deleteProductFunction(ids, this.repository)
  }

  public async updateProduct(
    id: string,
    req: ProductRequest
  ): Promise<CommonResponse<ProductRequestError | string>> {
    return await updateProductFunction(req, this.repository, id)
  }

  public async getInternalProduct(
    id: string,
    serviceToken: string
  ): Promise<CommonResponse<ProductEntity | string>> {
    return await findInternalProductFunction(serviceToken, this.repository, id)
  }
}
