import { CommonRepository } from 'common-abstract-fares-system'
import { ReviewSchema, IReview } from './review-entity'

export class InternalUserRepository extends CommonRepository<IReview> {
  constructor() {
    super(ReviewSchema, 'reviews')
  }
}
