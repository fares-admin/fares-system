import { CommonRepository } from 'common-abstract-fares-system'
import { InternalUserSchema, TInternalUserEntity } from './internal-user-entity'

export class InternalUserRepository extends CommonRepository<TInternalUserEntity> {
  constructor() {
    super(InternalUserSchema, 'internal-user')
  }
}
