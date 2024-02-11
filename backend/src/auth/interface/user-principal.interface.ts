import { RoleType } from 'src/shared/enum/role-type.enum';

export interface UserPrincipal {
  readonly playerId: string;
  readonly username: string;
  readonly email: string;
  readonly roles: RoleType[];
}
