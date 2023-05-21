import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = new InternalUserRepository()
  const result = await repo.save([
    {
      ...req.body,
      _id: null,
      password: '',
      created: new Date(),
      modified: null,
      token: '',
      codeLogin: '',
      codeForgot: '',
      twoFactor: false,
      verify: false,
      active: true,
    },
  ])
  res.status(200).json(result)
}
