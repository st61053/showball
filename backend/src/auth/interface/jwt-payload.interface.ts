import { RoleType } from '../../shared/enum/role-type.enum';

export interface JwtPayload {
  readonly sub: string;
  readonly upn: string;
  readonly email: string;
  readonly roles: RoleType[];
}
