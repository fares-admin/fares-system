import { InternalUserRepository } from '@/src/repository/internal-user-repo/internal-user-repository'
import { CommonResponse, CommonService } from 'common-abstract-fares-system'
import {
  AuthInternalUserReqError,
  InternalUserLoginReq,
  InternalUserLoginRes,
} from './auth-internal-user-dto'
import { loginFunction, verifyLoginCodeFunction } from './auth-service-function'

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
    return await loginFunction(loginReq, this.repository)
  }

  public async verifyLoginCode(
    username: string,
    code: string
  ): Promise<CommonResponse<InternalUserLoginRes | string>> {
    return verifyLoginCodeFunction(username, code, this.repository)
  }
}
