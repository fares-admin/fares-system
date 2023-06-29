import { CommonRepository } from 'common-abstract-fares-system'
import { ProductSchema, TProductEntity } from './product-entity'

export class ProductRepository extends CommonRepository<TProductEntity> {
  constructor() {
    super(ProductSchema, 'products')
  }
}
