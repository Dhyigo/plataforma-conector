import { UseCase } from '../../shared/interface/use-case'
import { Admin } from '../model/admin.entities'
import { AdminRepository } from '../provider/admin-repository'

interface ListAdminsRequest {
  companyId: string
}

interface ListAdminsResponse {
  admins: Admin[]
}

export class ListAdmins implements UseCase {
  constructor(private readonly repo: AdminRepository) {}
  async execute(input: ListAdminsRequest): Promise<ListAdminsResponse> {
    const { companyId } = input

    const admins = await this.repo.findByCompanyId(companyId)

    return {
      admins,
    }
  }
}
