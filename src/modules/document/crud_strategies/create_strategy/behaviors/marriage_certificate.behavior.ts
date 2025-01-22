import { DocumentCreator } from '../create_strategy';
import { DocumentEntity } from '../../../entities';
import { DocumentRepository } from '../../../repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
class MarriageCertificateCreationBehavior implements DocumentCreator {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async create(dto): Promise<DocumentEntity> {
    return await this.documentRepository.createMarriageCertificate(dto);
  }
}

export { MarriageCertificateCreationBehavior };
