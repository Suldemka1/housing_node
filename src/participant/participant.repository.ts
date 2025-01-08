import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ParticipantEntity } from './participant.entity';
import { DocumentEntity } from '../document/document.entity';

@Injectable()
class ParticipantRepository extends Repository<ParticipantEntity> {
  constructor(dataSource: DataSource) {
    super(ParticipantEntity, dataSource.createEntityManager());
  }

  async createDraft() {
    return this.save(this.create());
  }

  async bindPassport(id: string, passport: DocumentEntity) {
    const savedPassport = await this.manager.save(DocumentEntity, passport);
    const updateResult = await this.update(id, {
      passport: savedPassport,
    });
    return updateResult;
  }
}

export { ParticipantRepository };
