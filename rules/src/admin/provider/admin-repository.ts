import { Admin } from '../model/admin.entities'

export interface AdminRepository {
  create(admin: Admin): Promise<void>
  findById(adminId: string): Promise<Admin | null>
  save(admin: Admin): Promise<void>
}
