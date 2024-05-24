import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../shared/error/app-error'
import { UseCase } from '../../shared/interface/use-case'
import {
  PlatformManager,
  PlatformManagerProps,
} from '../model/platform-manager.entities'
import { PlatformManagerRepository } from '../provider/platform-manager-repository'
import { Email } from '../../shared/object-value/email.object-value'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Prefix } from '../../helpers/prefix'
import { PickAndRecord } from '../../helpers/pick-and-record'

type UpdateIdentificationDataRequest = Prefix<
  PickAndRecord<PlatformManagerProps, string, 'name' | 'email'>,
  'new'
> & {
  platformManagerId: string
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

    platformManager.changeIdentificationData({
      name: new SimpleName(newName),
      email: new Email(newEmail),
    })

    await this.repo.save(platformManager)

    return {
      platformManager,
    }
  }
}
