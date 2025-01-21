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
    const { accessToken, expires } = this.createAccessToken(account);
    const { refreshToken, refreshExpireDate } = this.createRefreshToken();

    return {
      accessToken,
      expires,
      refreshToken,
      refreshExpireDate,
    };
  }

  private createAccessToken(account: Omit<AccountEntity, 'password'>) {
    const now = Date.now();
    const accessToken = sign(
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

    return { accessToken: accessToken, expires: expires };
  }

  private createRefreshToken() {
    const refreshToken = nanoid(64);
    const now = Date.now();
    const twoDays = 2 * 86400;
    const refreshExpireDate = now + twoDays;

    return { refreshToken, refreshExpireDate };
  }

  comparePassword = async (password: string, hashed_password: string) => {
    return await bcrypt.compare(password, hashed_password);
  };

  onModuleInit() {
    this.secret = this.configService.get<string>('secret');
  }
}

export { AuthService };
