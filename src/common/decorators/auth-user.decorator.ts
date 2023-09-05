import { REQUEST_USER_KEY } from '../constants/auth.constant';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[REQUEST_USER_KEY];
  },
);
