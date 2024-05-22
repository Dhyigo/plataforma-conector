import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../shared/error/app-error'
import { PasswordServices } from '../../shared/interface/password-services'
import { CompanyRepository } from '../provider/company-repository'
import { Company } from '../model/company.entities'
import { UseCase } from '../../shared/interface/use-case'

interface ChangePasswordCompanyRequest {
  companyId: string
  newPassword: string
}

interface ChangePasswordCompanyResponse {
  company: Company
}

export class ChangePasswordCompany implements UseCase {
  constructor(
    private readonly repo: CompanyRepository,
    private readonly passwordService: PasswordServices
  ) {}

  async execute(
    input: ChangePasswordCompanyRequest
  ): Promise<ChangePasswordCompanyResponse> {
    const { newPassword, companyId } = input
    const company = await this.repo.findById(companyId)

    if (company == null) {
      throw new AppError({
        message: 'Empresa não encontrada.',
        statusCode: StatusCodes.NOT_FOUND,
      })
    }

    const password = await this.passwordService.hash(newPassword)
    company.changePassword(password)

    await this.repo.save(company)

    return {
      company,
    }
  }
}
