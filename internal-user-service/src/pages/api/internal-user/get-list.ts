import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = new InternalUserRepository()
  const result = await repo.find(1, 10)
  res.status(200).json(result)
}
