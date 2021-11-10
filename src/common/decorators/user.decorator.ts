import { createParamDecorator } from '@nestjs/common';

export const UserDec = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);
