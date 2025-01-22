import { Injectable } from '@nestjs/common';
import { DocumentRepository } from '../../../repositories';
import { DocumentEntity } from '../../../entities';
import { DocumentUpdater } from '../update_strategy';

@Injectable()
class DivorceCertificateUpdateBehavior implements DocumentUpdater {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async update(dto): Promise<DocumentEntity> {
    return await this.documentRepository.updateDivorceCertificate(dto);
  }
}

export { DivorceCertificateUpdateBehavior };
