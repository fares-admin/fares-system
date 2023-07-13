import { IS_REQUIRED, ObjectValidator } from 'validation-tool-fares-system'

export class ReviewRequest {
  productId: string = ''

  variantId: string[] = []

  email: string = ''

  name: string = ''

  score: number = 0

  reviewer: string = ''
}

export const ReviewReqValidator: ObjectValidator<ReviewRequest> = {
  productId: IS_REQUIRED,
  variantId: IS_REQUIRED,
  email: IS_REQUIRED,
  name: IS_REQUIRED,
  score: IS_REQUIRED,
}

export type ReviewRequestError = Record<keyof ReviewRequest, string>
