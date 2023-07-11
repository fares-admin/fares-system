import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import { CommonResponse } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { validate } from 'validation-tool-fares-system'
import { RoomReq, RoomReqError, RoomValidatorSchema } from '../room-req'

export const updateRoomFunction = async (
  req: RoomReq,
  id: string,
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
  const res = {
    success: false,
    message: '',
    result: {
      productId: '',
      title: '',
      size: '',
      maxPersons: '',
      price: '',
      salePrices: '',
      image: '',
    },
    status: 400,
  }
  if (!id || !mongoose.isValidObjectId(id)) {
    return {
      ...res,
      message: 'invalid room id',
    }
  }
  if (!req.productId || !mongoose.isValidObjectId(req.productId)) {
    return {
      ...res,
      message: 'invalid productId',
    }
  }
  const findRoom = await repository.findOne('_id', new mongoose.Types.ObjectId(id))
  if (!findRoom.result) {
    return {
      success: false,
      message: 'not found room',
      result: '',
      status: 404,
    }
  }
  const { error } = await repository.update([
    {
      ...findRoom.result,
      ...req,
    },
  ])
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
