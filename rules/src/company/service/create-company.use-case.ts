import { UseCase } from '../../shared/interface/use-case'
import { PasswordServices } from '../../shared/interface/password-services'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Email } from '../../shared/object-value/email.object-value'
import { CompanyRepository } from '../provider/company-repository'
import { Company } from '../model/company.entities'
import { Cnpj } from '../model/cnpj.value-object'

interface CreateCompanyRequest {
  name: string
  email: string
  password: string
  cnpj: string
  org: string
}

interface CreateCompanyResponse {
  company: Company
}

export class CreateCompany implements UseCase {
  constructor(
    private readonly repo: CompanyRepository,
    readonly passwordServices: PasswordServices
  ) {}

  async execute(input: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const { name, email, password, cnpj } = input

    const passwordHash = await this.passwordServices.hash(password)

    const company = new Company({
      name: new SimpleName(name),
      email: new Email(email),
      cnpj: new Cnpj(cnpj),
      password: passwordHash,
    })

    await this.repo.create(company)

    return {
      company,
    }
  }
}
