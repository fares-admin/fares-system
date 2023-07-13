import { ReviewStatus } from '@/src/repository/review-repository/review-entity'
import { PublicReviewRes } from './review-public-res'

export class PrivateReviewRes extends PublicReviewRes {
  status: ReviewStatus = ReviewStatus.OFFLINE
}
