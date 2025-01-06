import { DataSource, Repository } from 'typeorm';
import { RealEstateEntity } from './real_estate.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
class RealEstateRepository extends Repository<RealEstateEntity> {
  constructor(dataSource: DataSource) {
    super(RealEstateEntity, dataSource.createEntityManager());
  }

  async createDraft() {
    const realEstateEntity = this.create();
    return await this.save(realEstateEntity);
  }
}

export { RealEstateRepository };
