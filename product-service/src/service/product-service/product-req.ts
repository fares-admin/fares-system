import {
  IFeature,
  ILongDescription,
  IShipSpec,
  TypeProduct,
} from '@/src/repository/product-repository/product-entity'
import { IS_REQUIRED, ObjectValidator } from 'validation-tool-fares-system'

export class ProductRequest {
  defaultPrice: string = ''

  images: string[] = []

  title: string = ''

  address: string = ''

  longitude: string = ''

  latitude: string = ''

  spec: {
    ship?: IShipSpec
  } = {}

  shortDescription: string[] = []

  features: IFeature[] = []

  longDescription: ILongDescription[] = []

  typeProduct: TypeProduct = TypeProduct.SHIP
}

export type ProductRequestError = {
  defaultPrice: string
  images: string
  title: string
  address: string
  longitude: string
  latitude: string
  spec: {
    ship?: {
      launch: string
      cabin: string
      shell: string
      trip: string
      admin: string
    }
  }
  shortDescription: string
  features: string
  longDescription: string
  typeProduct: string
}

export const ProductRequestValidator: ObjectValidator<ProductRequestError> = {
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

export const ShipSpecValidator: ObjectValidator<IShipSpec> = {
  launch: IS_REQUIRED,
  cabin: IS_REQUIRED,
  shell: IS_REQUIRED,
  trip: IS_REQUIRED,
  admin: IS_REQUIRED,
}
