import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../shared/error/app-error'
import { UseCase } from '../../shared/interface/use-case'
import { Company } from '../model/company.entities'
import { CompanyRepository } from '../provider/company-repository'

interface RemovePaymentDataRequest {
  companyId: string
}

interface RemovePaymentDataResponse {
  company: Company
}

export class RemovePaymentDataCompany implements UseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(
    input: RemovePaymentDataRequest
  ): Promise<RemovePaymentDataResponse> {
    const { companyId } = input

    const company = await this.repo.findById(companyId)

    if (company === null) {
      throw new AppError({
        message: 'Empresa não encontrada.',
        statusCode: StatusCodes.NOT_FOUND,
      })
    }

    company.setPaymentData(null)

    await this.repo.save(company)

    return {
      company,
    }
  }
}
