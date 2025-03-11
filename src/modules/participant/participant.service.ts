import { Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantRepository } from './participant.repository';
import { ParticipantEntity } from './participant.entity';
import { FamilyRepository } from '../family/family.repository';
import { DeepPartial } from 'typeorm';
import {
  ParticipantCreateEntityDTO,
  ParticipantRequestDTO,
} from './dto/participant.create';
import { DocumentRepository } from 'src/modules/document/repositories';
import { DocumentCreateStrategy } from '../document/crud_strategies/create_strategy/create_strategy';
import { AnyDocumentCreateDTO } from '../document/crud_strategies/create_strategy/dto';
import { ParentChildrenService } from '../parent_children/parent_children.service';
import { DocumentService } from '../document/document.service';
import { DocumentTypes } from '../document/entities';
import { PassportUpdateDTO } from '../document/crud_strategies/update_strategy/dto';
import { ApplicationEntityCreateDTO } from '../application/dto/application.create';

@Injectable()
class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly documentCreateStrategy: DocumentCreateStrategy,
    private readonly documentService: DocumentService,
    private readonly documentRepository: DocumentRepository,
    private readonly familyRepository: FamilyRepository,
    private readonly parentChildrenService: ParentChildrenService,
  ) {}

  async createWithDocuments(
    participantEntity: ParticipantCreateEntityDTO,
  ): Promise<ParticipantEntity> {
    try {
      const { documents, ...participantDTO } = participantEntity;

      const participantObject: ParticipantEntity =
        this.participantRepository.create({
          ...participantDTO,
          family: {
            id: participantDTO.family_id,
          },
          spouse: participantDTO.spouse_id
            ? { id: participantDTO.spouse_id }
            : null,
        });

      const participant =
        await this.participantRepository.save(participantObject);

      await this.createParticipantDocuments(participant.id, documents);
      return participant;
    } catch (error) {
      console.error(error);
    }
  }

  async createParticipantDocuments(
    participantId: string,
    documents: ParticipantCreateEntityDTO['documents'],
  ) {
    for (const document of documents) {
      const { ...documentData } = document as AnyDocumentCreateDTO;
      const newDocument = await this.documentCreateStrategy.create({
        ...documentData,
      });
      await this.documentRepository.update(
        {
          id: newDocument.id,
        },
        {
          participant: {
            id: participantId,
          },
        },
      );
    }
  }

  async createMarriedParticipants(
    spouses: [ParticipantRequestDTO, ParticipantRequestDTO | undefined],
    family_id: number,
  ): Promise<[ParticipantEntity, ParticipantEntity | null]> {
    const [applicantDto, spouseDto] = spouses;

    const applicant = await this.createWithDocuments({
      ...applicantDto,
      family_id,
    });

    if (spouseDto) {
      const spouse = await this.createWithDocuments({
        ...spouseDto,
        spouse_id: applicant.id,
        family_id,
      });

      await this.participantRepository.update(
        {
          id: applicant.id,
        },
        {
          spouse: {
            id: spouse.id,
          },
        },
      );

      return [applicant, spouse];
    }

    return [applicant, null];
  }

  async createChildren(
    children: ParticipantRequestDTO[],
    parents: ParticipantEntity[] | null[],
    family_id: number,
  ): Promise<ParticipantEntity[]> {
    try {
      const parentList = parents.map((parent: ParticipantEntity | null) => {
        if (parent) return parent.id;
        return null;
      });
      const childrenList: string[] = [];
      const createdChildrenArray: ParticipantEntity[] = [];

      for (const child of children) {
        const childEntity = await this.createWithDocuments({
          ...child,
          family_id,
        });
        createdChildrenArray.push(childEntity);
        childrenList.push(childEntity.id);
      }

      await this.parentChildrenService.appendChildren(parentList, childrenList);
      return createdChildrenArray;
    } catch (error) {
      console.error(error);
    }
  }

  async findByApplicationId(
    applicationId: number,
  ): Promise<ParticipantEntity[]> {
    return await this.participantRepository.findByApplicationId(applicationId);
  }

  async update(id: string, dto: DeepPartial<ParticipantEntity>) {
    const { documents, ...otherProps } = dto;
    const data = await this.participantRepository.update(id, {
      ...otherProps,
    });
    for (const document of documents) {
      if (
        document.type === DocumentTypes.PASSPORT ||
        document.type === DocumentTypes.BIRTH_CERTIFICATE
      ) {
        const updatedDocuments = await this.documentService.update(
          document as PassportUpdateDTO,
        );
      }
    }

    return data;
  }

  async validateParticipant(id: string): Promise<string[]> {
    const errors: string[] = [];
    const participant = await this.participantRepository.findOneBy({ id: id });
    if (!participant) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }

    const id_doc = await this.documentService.getIdentificationDocument(id);
    if (!id_doc) {
      errors.push(
        `Участник программы с ${participant.surname} ${participant.name} не имеет документа, удостоверяющий личность`,
      );
    }

    const age =
      new Date().getFullYear() -
      new Date(id_doc.passport.birthdate).getFullYear();

    if (age > 35) {
      errors.push(
        `Участник программы с ${participant.surname} ${participant.name} старше 35 лет`,
      );
    }

    return errors;
  }
}

export { ParticipantService };
