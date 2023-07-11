import { CommonRepository } from 'common-abstract-fares-system'
import { RoomSchema, IRoomEntity } from './room-entity'

export class RoomRepository extends CommonRepository<IRoomEntity> {
  constructor() {
    super(RoomSchema, 'rooms')
  }
}
