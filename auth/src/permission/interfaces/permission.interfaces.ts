import { PermissionEnum } from './permission.enum';

export interface IPermission {
  domain_name: string;
  name: PermissionEnum;
  role_name: string;
  created_at: string;
  updated_at: string;
}
