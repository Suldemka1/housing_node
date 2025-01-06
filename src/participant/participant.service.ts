import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from './participant.repository';
import { ParticipantEntity } from './participant.entity';
import { DocumentFactoryService } from '../document/factory/document.factory';
import { DocumentType } from '../document/document.entity';
import { FamilyRepository } from '../family/family.repository';

@Injectable()
class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly documentFactory: DocumentFactoryService,
    private readonly familyRepository: FamilyRepository,
  ) {}

  async create(participantEntity: ParticipantEntity) {
    const participantObject: ParticipantEntity =
      this.participantRepository.create(participantEntity);

    const participant =
      await this.participantRepository.save(participantObject);

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
}

export { ParticipantService };
