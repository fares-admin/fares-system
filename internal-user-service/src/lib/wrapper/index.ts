import { CommonResponse } from '@/src/shared'
import { NextApiRequest } from 'next'

export const wrapperEndpoint = async <T>(
  req: NextApiRequest,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
  serviceFunc: Promise<CommonResponse<T>>
): Promise<CommonResponse<T | string>> => {
  if (req.method !== method) {
    return {
      success: false,
      message: 'not support method',
      result: '',
      status: 400,
    }
  }
  const result = await serviceFunc
  return result
}
