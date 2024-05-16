import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../shared/app-error'
import { UseCase } from '../../shared/interface/use-case'
import { PlatformManager } from '../model/platform-manager.entities'
import { PlatformManagerRepository } from '../provider/platform-manager-repository'

interface UpdateIdentificationDataRequest {
  platformManagerId: string
  newName: string
  newEmail: string
}

interface UpdateIdentificationDataResponse {
  platformManager: PlatformManager
}

export class UpdateIdentificationDataPlatformManager implements UseCase {
  constructor(private readonly repo: PlatformManagerRepository) {}

  async execute(
    input: UpdateIdentificationDataRequest
  ): Promise<UpdateIdentificationDataResponse> {
    const { platformManagerId, newName, newEmail } = input

    const platformManager = await this.repo.findById(platformManagerId)

    if (platformManager === null) {
      throw new AppError({
        message: 'Gerente de plataforma não encontrado.',
        statusCode: StatusCodes.NOT_FOUND,
      })
    }

    platformManager.changeIdentificationData(newName, newEmail)

    await this.repo.update(platformManager)

    return {
      platformManager,
    }
  }
}
