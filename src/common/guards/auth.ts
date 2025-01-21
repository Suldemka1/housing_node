import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { body } = context.switchToHttp().getRequest();

    return undefined;
  }
}

export { AuthGuard };
