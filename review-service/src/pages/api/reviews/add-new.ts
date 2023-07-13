import { ReviewService } from '@/src/service/review-service/review-service'
import { NextApiRequest, NextApiResponse } from 'next'
import { wrapperEndpoint } from 'wrapper-endpoints-fares-system'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new ReviewService()
  const result = await wrapperEndpoint(req, 'POST', service.addNewReview(req.body))
  res.status(200).json(result)
}
