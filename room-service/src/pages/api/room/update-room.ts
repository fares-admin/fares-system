import { RoomService } from '@/src/service/room-service/room-service'
import { NextApiRequest, NextApiResponse } from 'next'
import { wrapperEndpoint } from 'wrapper-endpoints-fares-system'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new RoomService()
  const result = await wrapperEndpoint(
    req,
    'PUT',
    service.updateRoom(req.body, (req.query.id as string) || '')
  )
  res.status(200).json(result)
}
