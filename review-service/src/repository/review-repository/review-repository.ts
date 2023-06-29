import { CommonRepository } from 'common-abstract-fares-system'
import { ReviewSchema, TReviewEntity } from './review-entity'

export class InternalUserRepository extends CommonRepository<TReviewEntity> {
  constructor() {
    super(ReviewSchema, 'reviews')
  }
}
