import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../shared/error/app-error'
import { UseCase } from '../../shared/interface/use-case'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'
import { Company } from '../model/company.entities'
import { CompanyRepository } from '../provider/company-repository'
import { BankData, BankDataProps } from '../model/bank-data.entities'
import { TextNumeric } from '../../shared/object-value/text-numeric.value-object'

interface AddPaymentDataRequest extends Record<keyof BankDataProps, string> {
  companyId: string
}

interface AddPaymentDataResponse {
  company: Company
}

export class AddPaymentDataCompany implements UseCase {
  constructor(private readonly repo: CompanyRepository) {}

  async execute(input: AddPaymentDataRequest): Promise<AddPaymentDataResponse> {
    const { accountNumber, agency, name, typeAccount, companyId } = input

    const company = await this.repo.findById(companyId)

    if (company === null) {
      throw new AppError({
        message: 'Empresa não encontrada.',
        statusCode: StatusCodes.NOT_FOUND,
      })
    }

    const bankData = new BankData({
      name: new SimpleName(name),
      typeAccount: new SimpleName(typeAccount, { field: 'Tipo da conta' }),
      accountNumber: new TextNumeric(accountNumber, 'Número da conta'),
      agency: new TextNumeric(agency, 'Número da agencia'),
    })

    company.setPaymentData(bankData)

    await this.repo.save(company)

    return {
      company,
    }
  }
}
