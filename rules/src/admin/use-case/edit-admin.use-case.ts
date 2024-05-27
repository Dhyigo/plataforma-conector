import { StatusCodes } from 'http-status-codes'
import { PickAndRecord } from '../../helpers/pick-and-record'
import { AppError } from '../../shared/error/app-error'
import { UseCase } from '../../shared/interface/use-case'
import { Admin, AdminProps } from '../model/admin.entities'
import { AdminRepository } from '../provider/admin-repository'
import { Email } from '../../shared/object-value/email.object-value'
import { SimpleName } from '../../shared/object-value/simple-name.value-object'

type EditAdminRequest = PickAndRecord<AdminProps, string, 'name' | 'email'> & {
  adminId: string
}

interface EditAdminResponse {
  admin: Admin
}

export class EditAdmin implements UseCase {
  constructor(private readonly repo: AdminRepository) {}
  async execute(input: EditAdminRequest): Promise<EditAdminResponse> {
    const { adminId, name, email } = input

    const admin = await this.repo.findById(adminId)
    if (!admin) {
      throw new AppError({
        message: 'Admin não encontrado.',
        statusCode: StatusCodes.NOT_FOUND,
      })
    }

    admin.changeIdentificationData({
      name: new SimpleName(name),
      email: new Email(email),
    })

    await this.repo.save(admin)

    return {
      admin,
    }
  }
}
