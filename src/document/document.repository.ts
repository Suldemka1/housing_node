import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DocumentEntity } from './document.entity';

@Injectable()
class DocumentRepository extends Repository<DocumentEntity> {
  constructor(dataSource: DataSource) {
    super(DocumentEntity, dataSource.createEntityManager());
  }
}

export { DocumentRepository };
