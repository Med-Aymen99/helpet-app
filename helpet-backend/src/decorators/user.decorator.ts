import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Déorateur récupérable vie @user
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
