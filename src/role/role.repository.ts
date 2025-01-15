import { DataSource, Repository } from 'typeorm';
import { RoleEntity, RoleTypes } from './role.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
class RoleRepository extends Repository<RoleEntity> implements OnModuleInit {
  constructor(dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  async onModuleInit() {
    try {
      const admin = this.create({
        name: RoleTypes.ADMIN,
      });
      await this.save(admin);

      const user = this.create({
        name: RoleTypes.USER,
      });
      await this.save(user);
    } catch (error) {
      console.log(error);
    }
  }
}

export { RoleRepository };
