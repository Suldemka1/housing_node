import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AuthService],
  controllers: [],
})
class AuthModule {}

export { AuthModule };
