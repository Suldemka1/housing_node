import { Injectable, OnModuleInit } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { AccountService } from '../account/account.service';
import { AccountEntity } from '../account/account.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
class AuthService implements OnModuleInit {
  secret: string = undefined;

  constructor(
    private readonly accountService: AccountService,
    private readonly configService: ConfigService,
  ) {}

  login(account: AccountEntity) {
    const { access_token, expires } = this.createAccessToken(account);
    const { refresh_token, refresh_expire_date } = this.createRefreshToken();

    return {
      access_token,
      expires,
      refresh_token,
      refresh_expire_date,
    };
  }

  private createAccessToken(account: Omit<AccountEntity, 'password'>) {
    const now = Date.now();
    const access_token = sign(
      {
        id: account.id,
        role: 'admin',
      },
      this.secret,
      {
        expiresIn: '1d',
        issuer: '',
      },
    );

    const expires = now + 86400;

    return { access_token, expires: expires };
  }

  private createRefreshToken() {
    const refresh_token = nanoid(64);
    const now = Date.now();
    const twoDays = 2 * 86400;
    const refresh_expire_date = now + twoDays;

    return { refresh_token, refresh_expire_date };
  }

  /**
   *
   * @param password
   * @param hashed_password
   */
  async comparePassword(hashed_password: string, password: string) {
    return await bcrypt.compare(password, hashed_password);
  }

  onModuleInit() {
    this.secret = this.configService.get<string>('secret');
  }
}

export { AuthService };
