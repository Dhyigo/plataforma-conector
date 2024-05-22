import { UseCase } from '../../shared/interface/use-case'
import { PasswordServices } from '../../shared/interface/password-services'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Email } from '../../shared/object-value/email.object-value'
import { Admin } from '../model/admin.entities'
import { AdminRepository } from '../provider/admin-repository'
import { Cpf } from '../../shared/object-value/cpf.value-object'

interface CreateAdminRequest {
  companyId: string
  name: string
  email: string
  password: string
  cpf: string
}

interface CreateAdminResponse {
  admin: Admin
}

export class CreateAdmin implements UseCase {
  constructor(
    private readonly repo: AdminRepository,
    private readonly passwordServices: PasswordServices
  ) {}

  async execute(input: CreateAdminRequest): Promise<CreateAdminResponse> {
    const { name, email, password, cpf, companyId } = input

    const passwordHash = await this.passwordServices.hash(password)

    const admin = new Admin({
      name: new SimpleName(name),
      email: new Email(email),
      cpf: new Cpf(cpf),
      password: passwordHash,
      companyId,
    })

    await this.repo.create(admin)

    return {
      admin,
    }
  }
}
