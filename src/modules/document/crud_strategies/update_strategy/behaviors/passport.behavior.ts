import { DocumentRepository } from '../../../repositories';
import { Injectable } from '@nestjs/common';
import { DocumentEntity } from '../../../entities';
import { PassportUpdateDTO } from '../dto';
import { DocumentUpdater } from '../update_strategy';

@Injectable()
class PassportUpdateBehavior implements DocumentUpdater {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async update(dto: PassportUpdateDTO): Promise<DocumentEntity> {
    return await this.documentRepository.updatePassport(dto);
  }
}

export { PassportUpdateBehavior };
