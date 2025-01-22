import { DocumentEntity } from '../../../entities';
import { DocumentRepository } from '../../../repositories';
import { Injectable } from '@nestjs/common';
import { DocumentUpdater } from '../update_strategy';

@Injectable()
class MarriageCertificateUpdateBehavior implements DocumentUpdater {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async update(dto): Promise<DocumentEntity> {
    return await this.documentRepository.updateMarriageCertificate(dto);
  }
}

export { MarriageCertificateUpdateBehavior };
