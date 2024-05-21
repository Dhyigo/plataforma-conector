import _ from 'lodash'
import { CompanyRepository } from '../../company/provider/company-repository'
import { Company } from '../../company/model/company.entities'

export class InMemoryCompanyRepository implements CompanyRepository {
  readonly companys: Company[] = []

  async create(company: Company): Promise<void> {
    company = _.cloneDeep(company)

    this.companys.push(company)
  }

  async findById(company: string): Promise<Company | null> {
    const user = this.companys.find((manager) => {
      return manager.id === company
    })
    return user ? _.cloneDeep(user) : null
  }

  async save(company: Company): Promise<void> {
    company = _.cloneDeep(company)

    const index = this.companys.findIndex(({ id }) => id === company.id)

    if (index === -1) {
      throw new Error('PlatformManager not found')
    }

    this.companys.splice(index, 1, company)
  }
}
