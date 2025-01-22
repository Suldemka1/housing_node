import { DocumentCreator } from '../create_strategy';
import { DocumentRepository } from '../../../repositories';
import { Injectable } from '@nestjs/common';
import { DocumentEntity } from '../../../entities';
import { PassportCreateDTO } from '../dto';

@Injectable()
class PassportCreationBehavior implements DocumentCreator {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async create(dto: PassportCreateDTO): Promise<DocumentEntity> {
    return await this.documentRepository.createPassport(dto);
  }
}

export { PassportCreationBehavior };
