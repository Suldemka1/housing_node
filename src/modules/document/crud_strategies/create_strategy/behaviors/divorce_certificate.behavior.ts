import { Injectable } from '@nestjs/common';
import { DocumentCreator } from '../create_strategy';
import { DocumentRepository } from '../../../repositories';
import { DocumentEntity } from '../../../entities';

@Injectable()
class DivorceCertificateCreationBehavior implements DocumentCreator {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async create(dto): Promise<DocumentEntity> {
    return await this.documentRepository.createDivorceCertificate(dto);
  }
}

export { DivorceCertificateCreationBehavior };
