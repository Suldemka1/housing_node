import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import FamilyEntity from './family.entity';

@Injectable()
class FamilyRepository extends Repository<FamilyEntity> {
  constructor(dataSource: DataSource) {
    super(FamilyEntity, dataSource.createEntityManager());
  }

  async createDraft() {
    return this.save(this.create());
  }
}

export { FamilyRepository };
