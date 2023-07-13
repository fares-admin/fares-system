import { Room } from '@/src/repository/room-repository/room-entity'
import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import { CommonListResult, CommonResponse, PipelineResponse } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { NextApiRequest } from 'next'
import { PrivateRoomRes } from '../room-private-res'
import { PublicRoomRes } from '../room-public-res'

export const getListRoomsFunc = async (
  req: NextApiRequest,
  repository: RoomRepository,
  getPageAndSize: (req: {
    query: {
      page: number
      size: number
    }
  }) => {
    page: number
    size: number
  },
  generatePipelineAggregate: (params: object, entity: Room) => mongoose.PipelineStage[],
  responseList: (
    result: PipelineResponse<CommonListResult<Room>>,
    res: PublicRoomRes | PrivateRoomRes
  ) => Promise<CommonResponse<CommonListResult<PublicRoomRes | PrivateRoomRes> | string>>,
  isAuth?: boolean
): Promise<CommonResponse<CommonListResult<PublicRoomRes | PrivateRoomRes> | string>> => {
  const { page, size } = getPageAndSize(req as any)
  const result = await repository.find(page, size, generatePipelineAggregate(req.query, new Room()))
  if (isAuth) {
    return await responseList(result, new PrivateRoomRes())
  }
  return await responseList(result, new PublicRoomRes())
}
