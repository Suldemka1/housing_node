import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as Express from 'express';

const Accountability = createParamDecorator((_, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  const session = request.session;

  return session.accountability;
});

export { Accountability };
