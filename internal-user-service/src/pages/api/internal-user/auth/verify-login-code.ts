import { AuthInternalUserService } from '@/src/service/auth-internal-user-service/auth-internal-user-service'
import { NextApiRequest, NextApiResponse } from 'next'
import { wrapperEndpoint } from 'wrapper-endpoints-fares-system'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new AuthInternalUserService()
  const result = await wrapperEndpoint(
    req,
    'GET',
    service.verifyLoginCode((req.query.username as string) || '', (req.query.code as string) || '')
  )
  res.status(200).json(result)
}
