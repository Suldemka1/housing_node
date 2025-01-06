import { DataSource, Repository } from 'typeorm';
import { RoleEntity, RoleTypes } from './role.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
class RoleRepository extends Repository<RoleEntity> {
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
