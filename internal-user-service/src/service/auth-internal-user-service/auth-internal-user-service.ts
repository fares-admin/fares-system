import { TypeCode } from '@/src/repository/internal-user-repo/internal-user-entity'
import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { CommonResponse, CommonService } from 'common-abstract-fares-system'
import {
  comparePassword,
  decodeBase64,
  generateUserToken,
  sendEmail,
} from 'common-lib-fares-system'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'validation-tool-fares-system'
import {
  AuthInternalUserReqError,
  AuthUserValidatorSchema,
  InternalUserLoginReq,
  InternalUserLoginRes,
} from './auth-internal-user-dto'

export class AuthInternalUserService extends CommonService<InternalUserRepository> {
  constructor() {
    super(new InternalUserRepository())
  }

  smtpOption = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'user',
      pass: process.env.SMTP_PASSWORD || 'password',
    },
  }

  public async login(
    loginReq: InternalUserLoginReq
  ): Promise<CommonResponse<AuthInternalUserReqError | InternalUserLoginRes | string>> {
    const validateRes = validate(loginReq, AuthUserValidatorSchema)
    if (validateRes.isError) {
      return this.genRes<AuthInternalUserReqError>(validateRes.error, 400, 'invalidRequest', false)
    }
    const findUsername = await this.repository.findOne('username', loginReq.username)
    if (!findUsername.result) {
      return {
        success: false,
        message: '',
        result: {
          username: 'not found user name',
          password: '',
        },
        status: 400,
      }
    }
    const comparePassResult = await comparePassword(
      decodeBase64(loginReq.password),
      findUsername.result.password
    )
    if (!comparePassResult) {
      return {
        success: false,
        message: '',
        result: {
          username: '',
          password: 'wrong password',
        },
        status: 400,
      }
    }
    if (findUsername.result.twoFactor) {
      const fiveDaysLater = new Date()
      fiveDaysLater.setMinutes(fiveDaysLater.getMinutes() + 5)
      const code = uuidv4()
      await sendEmail(this.smtpOption, 'fares.sys.vn@gmail.com', {
        to: findUsername.result.email,
        subject: 'login code',
        html: `<p>${code}</p>`,
      })
      await this.repository.update([
        {
          ...findUsername.result,
          codes:
            findUsername.result.codes.length < 10
              ? [
                  ...findUsername.result.codes,
                  { code, type: TypeCode.LOGIN, expired: fiveDaysLater },
                ]
              : [
                  ...findUsername.result.codes.filter((item, index) => index > 0),
                  { code, type: TypeCode.LOGIN, expired: fiveDaysLater },
                ],
        },
      ])
      return {
        success: true,
        message: 'sent login code to your email!',
        result: TypeCode.LOGIN,
        status: 200,
      }
    }
    const token = generateUserToken({ userId: findUsername.result._id.toString() })
    await this.repository.update([
      {
        ...findUsername.result,
        token,
      },
    ])
    return {
      success: true,
      message: 'success!',
      result: {
        token,
      },
      status: 200,
    }
  }

  public async verifyLoginCode(
    username: string,
    code: string
  ): Promise<CommonResponse<InternalUserLoginRes | string>> {
    if (!username || !code) {
      return {
        success: false,
        message: 'invalid login code!',
        result: '',
        status: 400,
      }
    }
    const findUsername = await this.repository.findOne('username', username)
    if (!findUsername.result) {
      return {
        success: false,
        message: 'not found user name',
        result: '',
        status: 400,
      }
    }
    const findCode = findUsername.result.codes.find((item) => item.code === code)
    if (!findCode) {
      return {
        success: false,
        message: 'invalid login code!',
        result: '',
        status: 400,
      }
    }
    if (
      findCode.code !== code ||
      findCode.type !== TypeCode.LOGIN.toString() ||
      findCode.expired.getTime() < new Date().getTime()
    ) {
      return {
        success: false,
        message: 'invalid login code!',
        result: '',
        status: 400,
      }
    }
    const token = generateUserToken({ userId: findUsername.result._id.toString() })
    await this.repository.update([
      {
        ...findUsername.result,
        token,
        codes: findUsername.result.codes.filter((item) => item.code !== code),
      },
    ])
    return {
      success: true,
      message: 'success!',
      result: {
        token,
      },
      status: 200,
    }
  }
}
