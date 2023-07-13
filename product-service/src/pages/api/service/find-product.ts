import { ProductService } from '@/src/service/product-service/product-service'
import { NextApiRequest, NextApiResponse } from 'next'
import { wrapperEndpoint } from 'wrapper-endpoints-fares-system'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new ProductService()
  const result = await wrapperEndpoint(
    req,
    'GET',
    service.getInternalProduct(
      req.query.id?.toString() || '',
      req.headers.ServiceToken?.toString() || ''
    )
  )
  res.status(200).json(result)
}
