import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const SECRET = this.configService.getOrThrow<string>('jwt.secret', {
        infer: true,
      });
      const request: Express.Request = context.switchToHttp().getRequest();
      const session = request.session;

      const { token } = session;

      if (!token) throw new UnauthorizedException('token was not provided');

      const isAuth = verify(token, SECRET);
      if (typeof isAuth === 'object') return true;

      throw new UnauthorizedException('token is not valid');
    } catch (e) {
      throw new UnauthorizedException('jwt expired or not valid');
    }
  }
}

export { AuthGuard };
