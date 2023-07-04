import mongoose from 'mongoose'

export enum TypeDes {
  IMAGE = 'image',
  PARAGRAPH = 'paragraph',
}

export enum TypeProduct {
  SHIP = 'ship',
}

export interface IShipSpec {
  launch: string
  cabin: number
  shell: string
  trip: string
  admin: string
}

export interface IFeature {
  icon: string
  text: string
}

export interface ILongDescription {
  type: TypeDes
  content: string
}

export interface TProductEntity {
  _id: mongoose.Types.ObjectId
  defaultPrice: mongoose.Types.ObjectId
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
  active: boolean
}

export const InitProductEntity: TProductEntity = {
  _id: new mongoose.Types.ObjectId(),
  defaultPrice: new mongoose.Types.ObjectId(),
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
  active: true,
}

export const ProductSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  defaultPrice: mongoose.Types.ObjectId,
  images: Array<String>,
  title: String,
  address: String,
  longitude: String,
  latitude: String,
  spec: {
    ship: Object,
  },
  shortDescription: Array<String>,
  features: Array<Object>,
  longDescription: Array<Object>,
  numReviews: Number,
  scoreReview: Number,
  TypeProduct: String,
  active: Boolean,
})
