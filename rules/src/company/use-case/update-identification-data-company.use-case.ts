import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../shared/error/app-error'
import { UseCase } from '../../shared/interface/use-case'
import { Email } from '../../shared/object-value/email.object-value'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Company } from '../model/company.entities'
import { CompanyRepository } from '../provider/company-repository'
import { Cnpj } from '../model/cnpj.value-object'

interface UpdateIdentificationDataRequest {
  companyId: string
  newName: string
  newEmail: string
  newCnpj: string
}

interface UpdateIdentificationDataResponse {
  company: Company
}

export class UpdateIdentificationDataCompany implements UseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(
    input: UpdateIdentificationDataRequest
  ): Promise<UpdateIdentificationDataResponse> {
    const { companyId, newName, newEmail, newCnpj } = input

    const company = await this.repo.findById(companyId)

    if (company === null) {
      throw new AppError({
        message: 'Empresa não encontrada.',
        statusCode: StatusCodes.NOT_FOUND,
      })
    }

    company.changeIdentificationData({
      name: new SimpleName(newName),
      email: new Email(newEmail),
      cnpj: new Cnpj(newCnpj),
    })

    await this.repo.save(company)

    return {
      company,
    }
  }
}
