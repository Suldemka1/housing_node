import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { AccountRepository } from './account.repository';
import { Module } from '@nestjs/common';
import { RoleModule } from '../role/role.module';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), RoleModule],
  providers: [AccountRepository, AccountService],
  exports: [AccountService],
})
class AccountModule {}

export { AccountModule };
