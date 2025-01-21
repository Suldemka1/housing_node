import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [AccountModule],
  providers: [AuthService],
  controllers: [AuthController],
})
class AuthModule {}

export { AuthModule };
