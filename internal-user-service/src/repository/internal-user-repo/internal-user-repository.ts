import { CommonRepository } from '../common-repo/common-repo'
import { InternalUserSchema, TInternalUserEntity } from './internal-user-entity'

export class InternalUserRepository extends CommonRepository<TInternalUserEntity> {
  constructor() {
    super(InternalUserSchema, 'internal-user')
  }
}
