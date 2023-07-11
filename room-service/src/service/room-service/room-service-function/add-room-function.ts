import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import { RoomReq, RoomReqError, RoomValidatorSchema } from '../room-dto'
import { CommonResponse } from 'common-abstract-fares-system'
import { validate } from 'validation-tool-fares-system'
import { convertValue } from 'object-mapper-fares-system'
import { IRoomEntity, InitRoomEntity } from '@/src/repository/room-repository/room-entity'

export const addNewRoomFunction = async (
  req: RoomReq,
  repository: RoomRepository
): Promise<CommonResponse<RoomReqError | string>> => {
  const validateRes = validate(req, RoomValidatorSchema)
  if (validateRes.isError) {
    return {
      success: false,
      result: validateRes.error,
      message: 'invalidRequest',
      status: 400,
    }
  }
  // const res = {
  //   success: false,
  //   message: '',
  //   result: {
  //     productId: '',
  //     title: '',
  //     size: '',
  //     maxPersons: '',
  //     price: '',
  //     salePrices: '',
  //     image: '',
  //   },
  //   status: 400,
  // }

  // to do
  // const findProduct = await repository.findOne('productId', req.productId)
  // if (!findProduct.result) {
  //   return {
  //     ...res,
  //     result: { ...res.result, productId: 'Invalid product' },
  //   }
  // }
  const entity = convertValue<IRoomEntity>(req, InitRoomEntity)
  const { error } = await repository.insert([{ ...entity }])
  if (error) {
    return {
      status: 500,
      message: error || '',
      result: '',
      success: false,
    }
  }
  return {
    status: 200,
    message: 'ok',
    result: '',
    success: true,
  }
}
