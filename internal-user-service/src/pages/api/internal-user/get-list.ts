import getInternalUsers from '@/src/repository/internal-user-repository'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await getInternalUsers()
  res.status(200).json(result)
}
