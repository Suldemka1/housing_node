import { DocumentRepository } from '../../../repositories';
import { Injectable } from '@nestjs/common';
import { DocumentEntity } from '../../../entities';
import { BirthCertificateUpdateDTO } from '../dto';
import { DocumentUpdater } from '../update_strategy';

@Injectable()
class BirthCertificateUpdateBehavior implements DocumentUpdater {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async update(dto: BirthCertificateUpdateDTO): Promise<DocumentEntity> {
    return await this.documentRepository.updateBirthCertificate(dto);
  }
}

export { BirthCertificateUpdateBehavior };
