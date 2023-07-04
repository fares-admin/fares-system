import { AuthInternalUserService } from '@/src/service/auth-internal-user-service/auth-internal-user-service'
import { NextApiRequest, NextApiResponse } from 'next'
import { wrapperEndpoint } from 'wrapper-endpoints-fares-system'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new AuthInternalUserService()
  const result = await wrapperEndpoint(
    req,
    'GET',
    service.verifyInternalUserToken(
      req.query.UserToken?.toString() || '',
      req.query.ServiceToken?.toString() || ''
    )
  )
  res.status(200).json(result)
}
