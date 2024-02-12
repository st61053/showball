import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { RoleType } from '../../shared/enum/role-type.enum';
import { UserPrincipal } from '../interface/user-principal.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user }: { user: UserPrincipal } = context
      .switchToHttp()
      .getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
