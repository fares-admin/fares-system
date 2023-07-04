import {
  IFeature,
  ILongDescription,
  IShipSpec,
  TypeProduct,
} from '@/src/repository/product-repository/product-entity'
import { IS_REQUIRED, ObjectValidator } from 'validation-tool-fares-system'

export interface PublicProductRes {
  _id: string
  defaultPrice: string
  images: string[]
  title: string
  address: string
  longitude: string
  latitude: string
  spec: {
    ship?: IShipSpec
  }
  shortDescription: string[]
  features: IFeature[]
  longDescription: ILongDescription[]
  numReviews: number
  scoreReview: number
  typeProduct: TypeProduct
}

export interface PrivateProductRes extends PublicProductRes {
  active: boolean
}

export const InitPublicProductRes: PublicProductRes = {
  _id: '',
  defaultPrice: '',
  images: [],
  title: '',
  address: '',
  longitude: '',
  latitude: '',
  spec: {},
  shortDescription: [],
  features: [],
  longDescription: [],
  numReviews: 0,
  scoreReview: 0,
  typeProduct: TypeProduct.SHIP,
}

export const InitPrivateProductRes: PrivateProductRes = {
  ...InitPublicProductRes,
  active: true,
}

export interface ProductRequest {
  defaultPrice: string
  images: string[]
  title: string
  address: string
  longitude: string
  latitude: string
  spec: {
    ship?: IShipSpec
  }
  shortDescription: string[]
  features: IFeature[]
  longDescription: ILongDescription[]
  typeProduct: TypeProduct
}

export type ProductRequestError = Record<keyof ProductRequest, string>

export const ProductRequestValidator: ObjectValidator<ProductRequestError> = {
  defaultPrice: IS_REQUIRED,
  images: IS_REQUIRED,
  title: IS_REQUIRED,
  address: IS_REQUIRED,
  longitude: IS_REQUIRED,
  latitude: IS_REQUIRED,
  shortDescription: IS_REQUIRED,
  features: IS_REQUIRED,
  longDescription: IS_REQUIRED,
  typeProduct: IS_REQUIRED,
}
