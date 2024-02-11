import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../shared/enum/role-type.enum';

export const HAS_ROLES_KEY = 'has-roles';
export const HasRoles = (...roles: RoleType[]) =>
  SetMetadata(HAS_ROLES_KEY, roles);
