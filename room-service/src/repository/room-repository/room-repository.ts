import { CommonRepository } from 'common-abstract-fares-system'
import { RoomSchema, TRoomEntity } from './room-entity'

export class InternalUserRepository extends CommonRepository<TRoomEntity> {
  constructor() {
    super(RoomSchema, 'rooms')
  }
}
