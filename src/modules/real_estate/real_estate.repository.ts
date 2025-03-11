import { DataSource, DeepPartial, Repository } from 'typeorm';
import { RealEstateEntity } from './real_estate.entity';
import { Injectable } from '@nestjs/common';
import {
  ApplicationEntityCreateDTO,
  DocumentRequestData,
  RealEstateDTO,
} from '../application/dto/application.create';
import { DocumentEntity } from '../document/entities';

@Injectable()
class RealEstateRepository extends Repository<RealEstateEntity> {
  constructor(dataSource: DataSource) {
    super(RealEstateEntity, dataSource.createEntityManager());
  }

  async createRealEstate(
    applicationId: number,
    dto: RealEstateDTO,
  ): Promise<RealEstateEntity> {
    const { area, support_amount, full_price, sqm_price, documents } = dto;

    const realEstateEntity = this.create({
      area,
      support_amount,
      full_price,
      sqm_price,
      application: {
        id: applicationId,
      },
    });

    const savedDocuments = await this.saveRealEstateDocuments(documents);
    console.log(savedDocuments);

    return await this.save(realEstateEntity);
  }

  async saveRealEstateDocuments(documents: DocumentRequestData[]) {
    const createdDocuments: DocumentEntity[] = [];

    for (const uploadedDocuments of documents) {
      const document = this.manager.create(DocumentEntity, uploadedDocuments);
      createdDocuments.push(document);
    }

    const savedDocuments = await this.manager.save(createdDocuments);

    return savedDocuments;
  }
}

export { RealEstateRepository };
