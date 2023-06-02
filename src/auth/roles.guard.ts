import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { adminKey } from './constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    let authorization: string;
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      if (req.rawHeaders[i] === 'authorization') {
        authorization = req.rawHeaders[i + 1];
      }
    }
    return authorization === adminKey.secret;
  }
}
