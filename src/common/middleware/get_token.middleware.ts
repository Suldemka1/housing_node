import { NestMiddleware } from '@nestjs/common';
import * as Express from 'express';

export class GetTokenFromHeaderMiddleware implements NestMiddleware {
  use(req: Express.Request, _res: Response, next: (error?: any) => void) {
    const authorization = req.headers.authorization;
    if (authorization == undefined) return next();
    const [type, token] = authorization.split(' ');
    switch (type) {
      case 'Bearer':
        req.session.token = token;
        break;
      default:
        req.session.regenerate((err) => {
          if (err) {
            console.error(err);
            next(err);
          }

          req.session.token = null;

          req.session.save((err) => {
            if (err) {
              console.error(err);
              next(err);
            }
          });
        });

        break;
    }
    next();
  }
}
