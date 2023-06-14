import { InternalUserService } from '@/src/service/internal-user-service/internal-user-service'
import { NextApiRequest, NextApiResponse } from 'next'
import { wrapperEndpoint } from 'wrapper-endpoints-fares-system'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new InternalUserService()
  const result = await wrapperEndpoint(
    req,
    'PUT',
    service.updateUser(req.body, (req.query.id as string) || '')
  )
  res.status(200).json(result)
}
