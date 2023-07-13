import { Room } from '@/src/repository/room-repository/room-entity'
import { RoomRepository } from '@/src/repository/room-repository/room-repository'
import axios from 'axios'
import { CommonResponse } from 'common-abstract-fares-system'
import { generateServiceToken } from 'common-lib-fares-system'
import { convertValue } from 'object-mapper-fares-system'
import { validate } from 'validation-tool-fares-system'
import { ProductEntity } from '../product-entity'
import { RoomReq, RoomReqError, RoomValidatorSchema } from '../room-req'

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
  const internalToken = generateServiceToken({ serviceName: process.env.SERVICE_NAME || '' })
  const callInternalProduct = await axios.get(
    `${process.env.PRODUCT_SERVICE_URL}/api/service/findProduct?id=${req.productId}&ServiceToken=${internalToken}`
  )
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
  if (callInternalProduct.status !== 200)
    return {
      status: 500,
      message: 'server error',
      result: '',
      success: false,
    }
  const result = callInternalProduct.data as CommonResponse<ProductEntity | string>
  if (!result.success) {
    return {
      ...res,
      message: result.message,
      result: { ...res.result, productId: 'invalid productId' },
    }
  }
  const findTitle = await repository.findOne('title', req.title)
  if (findTitle.result) {
    return {
      ...res,
      result: { ...res.result, title: 'title existed' },
    }
  }
  const entity = convertValue<Room>(req, new Room())
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
