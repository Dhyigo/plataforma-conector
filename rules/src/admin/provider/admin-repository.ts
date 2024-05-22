import { Admin } from '../model/admin.entities'

export interface AdminRepository {
  create(admin: Admin): Promise<void>
}
