import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { RoleRepository } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleRepository],
})
class RoleModule {}

export { RoleModule };
