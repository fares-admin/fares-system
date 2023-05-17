import { connect } from '../lib/mongodb'
import { InternalUserSchema } from './internal-user-entity'

export default async function getInternalUsers() {
  const { result } = await connect(InternalUserSchema, 'internal-user')
  if (result) {
    const { data } = result
    const ok = await data.find({})
    return ok
  }
  return {}
}
