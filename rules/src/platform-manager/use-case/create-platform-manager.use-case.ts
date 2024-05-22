import { PlatformManager } from '../model/platform-manager.entities'
import { UseCase } from '../../shared/interface/use-case'
import { PlatformManagerRepository } from '../provider/platform-manager-repository'
import { PasswordServices } from '../../shared/interface/password-services'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Email } from '../../shared/object-value/email.object-value'

interface CreatePlatformManagerRequest {
  name: string
  email: string
  password: string
}

interface CreatePlatformManagerResponse {
  platformManager: PlatformManager
}

export class CreatePlatformManager implements UseCase {
  constructor(
    private readonly repo: PlatformManagerRepository,
    readonly passwordServices: PasswordServices
  ) {}

  async execute(
    input: CreatePlatformManagerRequest
  ): Promise<CreatePlatformManagerResponse> {
    const { name, email, password } = input

    const passwordHash = await this.passwordServices.hash(password)

    const platformManager = new PlatformManager({
      name: new SimpleName(name),
      email: new Email(email),
      password: passwordHash,
    })

    await this.repo.create(platformManager)

    return {
      platformManager,
    }
  }
}
