import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountService } from '../account/account.service';
import { AuthCredentialsDTO, CreateAccountDTO } from './dto';

@Controller('auth')
class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post('/login')
  async login(@Body() body: AuthCredentialsDTO) {
    const { email, password } = body;
    const account = await this.accountService.getOne(email);
    if (!account) {
      throw new UnauthorizedException();
    }
    console.log(account);

    const isPasswordCompares = await this.authService.comparePassword(
      account.password,
      password,
    );
    console.log(isPasswordCompares);
    if (!isPasswordCompares) {
      throw new ForbiddenException();
    }

    const data = this.authService.login(account);

    return { data };
  }

  @Post('/register')
  async register(@Body() body: CreateAccountDTO) {
    const account = await this.accountService.create(body);
    const credentials = this.authService.login(account);

    return { data: credentials };
  }
}

export { AuthController };
