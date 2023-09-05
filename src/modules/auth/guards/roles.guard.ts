import { REQUEST_USER_KEY, ROLES_KEY } from '@common/constants/auth.constant';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesOnUsers } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!contextRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest()[REQUEST_USER_KEY];
    return contextRoles.some((roleId: number) =>
      user.rolesOnUsers.find(
        (rolesOnUser: RolesOnUsers) => rolesOnUser.roleId === roleId,
      ),
    );
  }
}
