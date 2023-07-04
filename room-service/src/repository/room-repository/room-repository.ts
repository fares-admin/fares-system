import { CommonRepository } from 'common-abstract-fares-system'
import { RoomSchema, IRoom } from './room-entity'

export class InternalUserRepository extends CommonRepository<IRoom> {
  constructor() {
    super(RoomSchema, 'rooms')
  }
}
