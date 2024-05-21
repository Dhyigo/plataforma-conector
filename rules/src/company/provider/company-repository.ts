import { Company } from '../model/company.entities'

export interface CompanyRepository {
  create(company: Company): Promise<void>
  findById(companyId: string): Promise<Company | null>
  save(Company: Company): Promise<void>
}
