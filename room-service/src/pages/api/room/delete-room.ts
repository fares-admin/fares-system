import { RoomService } from '@/src/service/room-service/room-service'
import { NextApiRequest, NextApiResponse } from 'next'
import { wrapperEndpoint } from 'wrapper-endpoints-fares-system'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new RoomService()
  const result = await wrapperEndpoint(req, 'DELETE', service.deleteRoom(req.query.ids as string))
  res.status(200).json(result)
}
