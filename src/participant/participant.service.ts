import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from './participant.repository';
import { ParticipantEntity } from './participant.entity';
import { DocumentFactoryService } from '../document/factory/document.factory';
import { DocumentType } from '../document/document.entity';
import { FamilyRepository } from '../family/family.repository';
import { DeepPartial } from 'typeorm';
import { ParticipantCreateEntityDTO } from './dto/participant.create';
import { DocumentRepository } from 'src/document/document.repository';

@Injectable()
class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly documentFactory: DocumentFactoryService,
    private readonly documentRepository: DocumentRepository,
    private readonly familyRepository: FamilyRepository,
  ) {}

  async create(participantEntity: ParticipantCreateEntityDTO) {
    const { documents, ...participantDTO } = participantEntity;

    const participantObject: ParticipantEntity =
      this.participantRepository.create({
        ...participantDTO,
        family: {
          id: participantDTO.familyId,
        },
        spouse: participantDTO.spouseId
          ? { id: participantDTO.spouseId }
          : null,
      });

    const participant =
      await this.participantRepository.save(participantObject);

    try {
      for (const document of documents) {
        const { files, ...documentData } = document;
        const newDocument = this.documentRepository.create({
          ...documentData,
          participant: {
            id: participantObject.id,
          },
        });
        await this.documentRepository.save(newDocument);
      }
    } catch (error) {
      console.error(error);
    }

    return participant;
  }

  async createDraft() {
    const draftParticipant = await this.participantRepository.createDraft();
    const draftFamily = await this.familyRepository.createDraft();
    const draftPassport = this.documentFactory.createDocument(
      DocumentType.PASSPORT,
    );
    await this.participantRepository.update(draftParticipant.id, {
      family: draftFamily,
    });

    await this.participantRepository.bindPassport(
      draftParticipant.id,
      draftPassport,
    );

    return draftParticipant;
  }

  async update(id: number, dto: DeepPartial<ParticipantEntity>) {
    const data = await this.participantRepository.update(id, {
      ...dto,
    });
    return data;
  }
}

export { ParticipantService };
