import { NestMiddleware, Request, Response } from '@nestjs/common';
import * as Express from 'express';
import { decode } from 'jsonwebtoken';

export class BuildAccountabilityMiddleware implements NestMiddleware {
  constructor() {}

  async use(
    @Request() req: Express.Request,
    @Response() _res: Express.Response,
    next: (error?: any) => void,
  ) {
    try {
      const token = req.session.token;

      if (typeof token != 'string') {
        next();
        return;
      }

      const payload = decode(token, {
        json: true,
      });

      req.session.accountability = {
        user: payload?.id,
        admin: payload?.admin_access,
        app: payload?.app_access,
      };

      next();
    } catch (e) {
      next();
    }
  }
}
