import _ from 'lodash'
import { AdminRepository } from '../../admin/provider/admin-repository'
import { Admin } from '../../admin/model/admin.entities'

export class InMemoryAdminRepository implements AdminRepository {
  readonly admins: Admin[] = []

  async create(admin: Admin): Promise<void> {
    admin = _.cloneDeep(admin)

    this.admins.push(admin)
  }

  async findById(adminId: string): Promise<Admin | null> {
    const user = this.admins.find((manager) => {
      return manager.id === adminId
    })
    return user ? _.cloneDeep(user) : null
  }

  async save(admin: Admin): Promise<void> {
    admin = _.cloneDeep(admin)

    const index = this.admins.findIndex(({ id }) => id === admin.id)

    if (index === -1) {
      throw new Error('Admin not found')
    }

    this.admins.splice(index, 1, admin)
  }

  async remove(adminId: string): Promise<void> {
    const index = this.admins.findIndex(({ id }) => id === adminId)
    if (index !== -1) {
      this.admins.splice(index, 1)
    }
  }
}
