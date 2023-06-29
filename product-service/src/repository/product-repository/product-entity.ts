import mongoose from 'mongoose'

export enum TypeDes {
  IMAGE = 'image',
  PARAGRAPH = 'paragraph',
}

export const ShipSpec = {
  launch: '',
  cabin: 0,
  shell: '',
  trip: '',
  admin: '',
}

export const Features = {
  icon: '',
  text: '',
}

export const ImageContent = {
  type: TypeDes.IMAGE,
  content: '',
}
export const ParagraphContent = {
  type: TypeDes.PARAGRAPH,
  content: '',
}

export enum TypeProduct {
  SHIP = 'ship',
}

export const InitProductEntity = {
  _id: new mongoose.Types.ObjectId(),
  defaultPrice: new mongoose.Types.ObjectId(),
  images: [''],
  title: '',
  address: '',
  longitude: '',
  latitude: '',
  spec: {
    ship: ShipSpec,
  },
  shortDescription: [''],
  features: [Features],
  longDescription: [ImageContent, ParagraphContent],
  numReviews: 0,
  scoreReview: 0,
  typeProduct: TypeProduct.SHIP,
  active: true,
}

export type TProductEntity = typeof InitProductEntity

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
