import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const token = request.headers.authorization;

  try {
    const x: any = verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    return x.id;
  } catch {
    throw new UnauthorizedException();
  }
});
