import { Review } from '@/src/repository/review-repository/review-entity'
import { ReviewRepository } from '@/src/repository/review-repository/review-repository'
import axios from 'axios'
import { CommonResponse } from 'common-abstract-fares-system'
import { generateServiceToken } from 'common-lib-fares-system'
import mongoose from 'mongoose'
import { convertValue } from 'object-mapper-fares-system'
import { validate } from 'validation-tool-fares-system'
import { ProductEntity, TypeProduct } from '../product-entity'
import { ReviewReqValidator, ReviewRequest, ReviewRequestError } from '../review-req'
import { Room } from '../room-entity'

/*
      @ericchen:
  
      put your explanation here
  */

export const addNewReviewFunction = async (
  req: ReviewRequest,
  repository: ReviewRepository
): Promise<CommonResponse<ReviewRequestError | string>> => {
  const validateRes = validate(req, ReviewReqValidator)
  if (validateRes.isError) {
    return {
      success: false,
      result: {
        ...validateRes.error,
      },
      message: 'invalidRequest',
      status: 400,
    }
  }
  const res = {
    success: false,
    message: '',
    result: {
      productId: '',
      variantId: '',
      email: '',
      name: '',
      score: '',
      reviewer: '',
    },
    status: 400,
  }
  const internalToken = generateServiceToken({ serviceName: process.env.SERVICE_NAME || '' })
  const callInternalProduct = await axios.get(
    `${process.env.PRODUCT_SERVICE_URL}/api/service/findProduct?id=${req.productId}&ServiceToken=${internalToken}`
  )
  if (callInternalProduct.status !== 200)
    return {
      status: 500,
      message: 'server error',
      result: '',
      success: false,
    }
  const result = callInternalProduct.data as CommonResponse<ProductEntity>
  if (!result.success) {
    return {
      ...res,
      message: result.message,
      result: { ...res.result, productId: 'invalid productId' },
    }
  }
  const variantList = await Promise.all(
    req.variantId.filter(async (item) => {
      if (result.result.typeProduct === TypeProduct.SHIP) {
        const callInternalRoom = await axios.get(
          `${process.env.ROOM_SERVICE_URL}/api/service/findProduct?id=${item}&ServiceToken=${internalToken}`
        )
        if (callInternalRoom.status === 200) {
          const result = callInternalProduct.data as CommonResponse<Room>
          if (result.success) {
            return true
          }
        }
      }
      return false
    })
  )
  const entity = convertValue<Review>(
    {
      ...req,
      variantId: variantList
        .filter((item) => item.length > 0)
        .map((item) => new mongoose.Types.ObjectId(item)),
      productId: new mongoose.Types.ObjectId(req.productId),
    },
    new Review()
  )
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
