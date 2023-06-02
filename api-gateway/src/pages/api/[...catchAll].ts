import logger from '@/src/lib/logger'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const gates: { serviceBaseRoute: string; host: string }[] = [
    {
      serviceBaseRoute: '/api/internal-user',
      host: process.env.INTERNAL_USER || '',
    },
  ]
  // get base path from config
  const url = gates.find((item) => req.url?.includes(item.serviceBaseRoute))
  if (!url) {
    res.status(500).json({ message: 'Not found host service' })
  }
  logger.info(['Method:', req.method || ''])
  try {
    // config headers
    const headers = {
      ...req.headers,
    } as any
    logger.info([headers])
    logger.info([`${url?.host}${req.url}`])
    let result = {}
    // handle method
    switch (req.method) {
      case 'GET': {
        result = (await axios.get(`${url?.host}${req.url}`, { ...req })).data
        break
      }
      case 'POST': {
        result = (await axios.post(`${url?.host}${req.url}`, req.body, { ...req })).data
        break
      }
      case 'PUT': {
        result = (await axios.put(`${url?.host}${req.url}`, req.body, { ...req })).data
        break
      }
      case 'DELETE': {
        result = (await axios.delete(`${url?.host}${req.url}`, { ...req })).data
        break
      }
      default: {
        res.status(500).json({ message: 'not support method' })
      }
    }
    res.status(200).json(result)
  } catch (error: any) {
    // handle error
    logger.info([error.message, 'Error: ', JSON.stringify(error)])
    res.status(500).json({ message: error.message, url, error, path: `${url?.host}${req.url}` })
  }
}
