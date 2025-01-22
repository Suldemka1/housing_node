import { DataSource, DeepPartial, Repository } from 'typeorm';
import { RealEstateEntity } from './real_estate.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
class RealEstateRepository extends Repository<RealEstateEntity> {
  constructor(dataSource: DataSource) {
    super(RealEstateEntity, dataSource.createEntityManager());
  }

  async createRealEstate(
    dto: DeepPartial<RealEstateEntity>,
  ): Promise<RealEstateEntity> {
    const realEstateEntity = this.create(dto);
    return await this.save(realEstateEntity);
  }

  async saveRealEstateDocuments() {}
}

export { RealEstateRepository };
