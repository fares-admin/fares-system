import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import { NextApiRequest } from 'next'
import { RoomReq, RoomReqError } from './room-req'
import { RoomRes } from './room-res'
import { addNewRoomFunction } from './room-service-function/add-room-function'
import { deleteRoomFunction } from './room-service-function/delete-room-function'
import { getListRoomsFunc } from './room-service-function/get-list-room-function'
import { updateRoomFunction } from './room-service-function/update-room-function'

export class RoomService extends CommonService<RoomRepository> {
  constructor() {
    super(new RoomRepository())
  }

  public async getListRooms(
    req: NextApiRequest
  ): Promise<CommonResponse<CommonListResult<RoomRes> | string>> {
    return await getListRoomsFunc(
      req,
      this.repository,
      this.getPageAndSize,
      this.generatePipelineAggregate,
      this.responseList
    )
  }

  public async addNewRoom(req: RoomReq): Promise<CommonResponse<RoomReqError | string>> {
    return await addNewRoomFunction(req, this.repository)
  }

  public async updateRoom(
    req: RoomReq,
    id: string
  ): Promise<CommonResponse<RoomReqError | string>> {
    return await updateRoomFunction(req, id, this.repository)
  }

  public async deleteRoom(ids: string): Promise<CommonResponse<string>> {
    return await deleteRoomFunction(ids, this.repository)
  }
}
