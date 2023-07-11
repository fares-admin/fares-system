import {
  IFeature,
  ILongDescription,
  IShipSpec,
  TypeProduct,
} from '@/src/repository/product-repository/product-entity'

export class PublicProductRes {
  _id: string = ''

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

  numReviews: number = 0

  scoreReview: number = 0

  typeProduct: TypeProduct = TypeProduct.SHIP
}
