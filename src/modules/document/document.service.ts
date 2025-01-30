import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './repositories';
import { FilesRepository } from '../files/files.repository';
import { DocumentCreateStrategy } from './crud_strategies/create_strategy/create_strategy';
import { AnyDocumentCreateDTO } from './crud_strategies/create_strategy/dto';
import { DocumentUpdateStrategy } from './crud_strategies/update_strategy/update_strategy';
import { AnyDocumentUpdateDTO } from './crud_strategies/update_strategy/dto';
import { DocumentEntity, DocumentTypes } from './entities';

@Injectable()
export class DocumentService {
  constructor(
    private readonly documentCreateStrategy: DocumentCreateStrategy,
    private readonly documentUpdateStrategy: DocumentUpdateStrategy,
    private readonly documentRepository: DocumentRepository,
    private readonly filesRepository: FilesRepository,
  ) {}

  async create(dto: AnyDocumentCreateDTO) {
    return await this.documentCreateStrategy.create(dto);
  }

  async getIdentificationDocument(participantId: string) {
    const identificationDocument = await this.documentRepository.findOne({
      where: {
        type: DocumentTypes.PASSPORT || DocumentTypes.BIRTH_CERTIFICATE,
        participant: { id: participantId },
      },
      relations: {
        participant: true,
      },
    });

    return identificationDocument;
  }

  async update(dto: AnyDocumentUpdateDTO) {
    return await this.documentUpdateStrategy.update(dto);
  }

  async delete(id: string) {
    return await this.documentRepository.delete(id);
  }
}
