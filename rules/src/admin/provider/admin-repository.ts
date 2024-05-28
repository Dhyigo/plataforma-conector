import { Admin } from '../model/admin.entities'

export interface AdminRepository {
  create(admin: Admin): Promise<void>
  findById(adminId: string): Promise<Admin | null>
  findByCompanyId(companyId: string): Promise<Admin[]>
  save(admin: Admin): Promise<void>
  remove(adminId: string): Promise<void>
}
