import { Review } from '@/src/repository/review-repository/review-entity'
import { ReviewRepository } from '@/src/repository/review-repository/review-repository'
import { CommonListResult, CommonResponse, PipelineResponse } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { NextApiRequest } from 'next'
import { PrivateReviewRes } from '../review-private-res'
import { PublicReviewRes } from '../review-public-res'

/*
      @ericchen:
  
      put your explanation here
  */

export const getListReviewFunc = async (
  req: NextApiRequest,
  repository: ReviewRepository,
  getPageAndSize: (req: {
    query: {
      page: number
      size: number
    }
  }) => {
    page: number
    size: number
  },
  generatePipelineAggregate: (params: object, entity: Review) => mongoose.PipelineStage[],
  responseList: (
    result: PipelineResponse<CommonListResult<Review>>,
    res: PublicReviewRes | PrivateReviewRes
  ) => Promise<CommonResponse<CommonListResult<PublicReviewRes | PrivateReviewRes> | string>>,
  isAuth: boolean
): Promise<CommonResponse<CommonListResult<PublicReviewRes | PrivateReviewRes> | string>> => {
  const { page, size } = getPageAndSize(req as any)
  const result = await repository.find(
    page,
    size,
    generatePipelineAggregate(req.query, new Review())
  )
  if (isAuth) {
    return await responseList(result, new PrivateReviewRes())
  }
  return await responseList(result, new PublicReviewRes())
}
