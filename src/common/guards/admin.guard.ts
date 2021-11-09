import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JWTPayload } from '../helpers/jwt.helper';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let request = context.switchToHttp().getRequest<Request>();
    if (!request) {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();
      request = { ...req };
    }
    const user = request.user as JWTPayload;
    if (user.role === 'manager') {
      return true;
    }
    return false;
  }
}
