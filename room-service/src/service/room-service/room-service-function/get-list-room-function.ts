import { IRoomEntity, InitRoomEntity } from '@/src/repository/room-repository/room-entity'
import { CommonListResult, CommonResponse, PipelineResponse } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { NextApiRequest } from 'next'
import { InitRoomRes, RoomRes } from '../room-dto'
import { RoomRepository } from '@/src/repository/room-repository/room-repository'

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
  generatePipelineAggregate: (params: object, entity: IRoomEntity) => mongoose.PipelineStage[],
  responseList: (
    result: PipelineResponse<CommonListResult<IRoomEntity>>,
    res: RoomRes
  ) => Promise<CommonResponse<CommonListResult<RoomRes> | string>>
): Promise<CommonResponse<CommonListResult<RoomRes> | string>> => {
  const { page, size } = getPageAndSize(req as any)
  const result = await repository.find(
    page,
    size,
    generatePipelineAggregate(req.query, InitRoomEntity)
  )

  return await responseList(result, InitRoomRes)
}
