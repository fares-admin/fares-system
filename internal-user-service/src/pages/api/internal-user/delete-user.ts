import { wrapperEndpoint } from '@/src/lib/wrapper'
import { InternalUserService } from '@/src/service/internal-user-service/internal-user-service'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new InternalUserService()
  const result = await wrapperEndpoint(req, 'DELETE', service.deleteUser(req.query.ids as string))
  res.status(200).json(result)
}
