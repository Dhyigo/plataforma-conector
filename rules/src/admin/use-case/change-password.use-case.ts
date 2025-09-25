import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../shared/error/app-error'
import { PasswordServices } from '../../shared/interface/password-services'
import { UseCase } from '../../shared/interface/use-case'
import { Admin } from '../model/admin.entities'
import { AdminRepository } from '../provider/admin-repository'

enum Status {
  SUCCESS = 'success',
  FAIL = 'fail',
}

interface ChangePasswordAdminRequest {
  adminId: string
  newPassword: string
  status: 'cancelado' | 'pendente'
}

interface ChangePasswordAdminResponse {
  admin: Admin
}

export class ChangePasswordAdmin implements UseCase {
  constructor(
    private readonly repo: AdminRepository,
    private readonly passwordService: PasswordServices
  ) {}

  async execute(
    input: ChangePasswordAdminRequest
  ): Promise<ChangePasswordAdminResponse> {
    const { newPassword, adminId } = input
    const admin = await this.repo.findById(adminId)

    if (admin == null) {
      throw new AppError({
        message: 'Admin não encontrado.',
        statusCode: StatusCodes.NOT_FOUND,
      })
    }

    const password = await this.passwordService.hash(newPassword)
    admin.changePassword(password)

    await this.repo.save(admin)

    return {
      admin,
    }
  }
}
