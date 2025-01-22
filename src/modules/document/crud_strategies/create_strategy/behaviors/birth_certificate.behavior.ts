import { DocumentCreator } from '../create_strategy';
import { DocumentRepository } from '../../../repositories';
import { Injectable } from '@nestjs/common';
import { DocumentEntity } from '../../../entities';
import { BirthCertificateCreateDTO } from '../dto';

@Injectable()
class BirthCertificateCreationBehavior implements DocumentCreator {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async create(dto: BirthCertificateCreateDTO): Promise<DocumentEntity> {
    return await this.documentRepository.createBirthCertificate(dto);
  }
}

export { BirthCertificateCreationBehavior };
