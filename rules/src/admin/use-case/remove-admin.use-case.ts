import { UseCase } from '../../shared/interface/use-case'
import { AdminRepository } from '../provider/admin-repository'

interface RemoveAdminRequest {
  adminId: string
}

export class RemoveAdmin implements UseCase {
  constructor(private readonly repo: AdminRepository) {}

  async execute(input: RemoveAdminRequest): Promise<void> {
    const { adminId } = input
    await this.repo.remove(adminId)
  }
}
