import { wrapperEndpoint } from '@/src/lib/wrapper'
import { InternalUserService } from '@/src/service/internal-user-service/internal-user-service'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new InternalUserService()
  const result = await wrapperEndpoint(req, 'POST', service.addNewUser(req.body))
  res.status(200).json(result)
}
