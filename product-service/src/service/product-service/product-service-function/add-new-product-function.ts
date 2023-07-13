import {
  ProductEntity,
  TypeDes,
  TypeProduct,
} from '@/src/repository/product-repository/product-entity'
import { ProductRepository } from '@/src/repository/product-repository/product-repository'
import { CommonResponse } from 'common-abstract-fares-system'
import { convertValue } from 'object-mapper-fares-system'
import { validate } from 'validation-tool-fares-system'
import {
  ProductRequest,
  ProductRequestError,
  ProductRequestValidator,
  ShipSpecValidator,
} from '../product-req'

/*
    @ericchen:

    put your explanation here
*/

export const addNewProductFunction = async (
  req: ProductRequest,
  repository: ProductRepository
): Promise<CommonResponse<ProductRequestError | string>> => {
  const validateRes = validate(req, ProductRequestValidator)
  if (validateRes.isError) {
    return {
      success: false,
      result: {
        ...validateRes.error,
        spec: {},
      },
      message: 'invalidRequest',
      status: 400,
    }
  }
  const res = {
    success: false,
    message: '',
    result: {
      defaultPrice: '',
      images: '',
      title: '',
      address: '',
      longitude: '',
      latitude: '',
      spec: {},
      shortDescription: '',
      features: '',
      longDescription: '',
      typeProduct: '',
    },
    status: 400,
  }
  const findTitle = await repository.findOne('title', req.title)
  if (findTitle.result) {
    return {
      ...res,
      result: { ...res.result, title: 'title exited' },
    }
  }
  if (req.typeProduct === TypeProduct.SHIP) {
    const validateShip = validate(req.spec.ship || {}, ShipSpecValidator)
    if (validateShip.isError) {
      return {
        ...res,
        result: { ...res.result, spec: validateShip.error },
      }
    }
  }
  const entity = convertValue<ProductEntity>(
    {
      ...req,
      images: req.images.filter((item) => item.length > 0),
      features: req.features.filter((item) => item.icon.length > 0 && item.text.length > 0),
      longDescription: req.longDescription.filter(
        (item) =>
          item.content.length > 0 &&
          item.type.length > 0 &&
          (item.type === TypeDes.IMAGE || item.type === TypeDes.PARAGRAPH)
      ),
    },
    new ProductEntity()
  )
  const { error } = await repository.insert([{ ...entity }])
  if (error) {
    return {
      status: 500,
      message: error || '',
      result: '',
      success: false,
    }
  }
  return {
    status: 200,
    message: 'ok',
    result: '',
    success: true,
  }
}
