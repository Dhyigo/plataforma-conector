import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../shared/error/app-error'
import { PasswordServices } from '../../shared/interface/password-services'
import { PlatformManagerRepository } from '../provider/platform-manager-repository'
import { PlatformManager } from '../model/platform-manager.entities'
import { UseCase } from '../../shared/interface/use-case'

interface ChangePasswordPlatformManagerRequest {
  platformManagerId: string
  newPassword: string
}

interface ChangePasswordPlatformManagerResponse {
  platformManager: PlatformManager
}

export class ChangePasswordPlatformManager implements UseCase {
  constructor(
    private readonly repo: PlatformManagerRepository,
    private readonly passwordService: PasswordServices
  ) {}

  async execute(
    input: ChangePasswordPlatformManagerRequest
  ): Promise<ChangePasswordPlatformManagerResponse> {
    const { newPassword, platformManagerId } = input
    const platformManager = await this.repo.findById(platformManagerId)

    if (platformManager == null) {
      throw new AppError({
        message: 'Gerente de plataforma não encontrado',
        statusCode: StatusCodes.NOT_FOUND,
      })
    }
    const password = await this.passwordService.hash(newPassword)

    platformManager.changePassword(password)

    await this.repo.save(platformManager)

    return {
      platformManager,
    }
  }
}
