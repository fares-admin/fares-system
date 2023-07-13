import { RoomService } from '@/src/service/room-service/room-service'
import { NextApiRequest, NextApiResponse } from 'next'
import { wrapperEndpoint } from 'wrapper-endpoints-fares-system'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new RoomService()
  const result = await wrapperEndpoint(
    req,
    'GET',
    service.getInternalRoom(
      req.query.id?.toString() || '',
      req.query.ServiceToken?.toString() || ''
    )
  )
  res.status(200).json(result)
}
