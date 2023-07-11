import { CommonRepository } from 'common-abstract-fares-system'
import { Review, ReviewSchema } from './review-entity'

export class InternalUserRepository extends CommonRepository<Review> {
  constructor() {
    super(ReviewSchema, 'reviews')
  }
}
