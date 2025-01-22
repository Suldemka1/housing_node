import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from './participant.repository';
import { ParticipantEntity } from './participant.entity';
import { DocumentFactoryService } from '../document/factory/document.factory';
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

@Injectable()
class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly documentFactory: DocumentFactoryService,
    private readonly documentCreateStrategy: DocumentCreateStrategy,
    private readonly documentRepository: DocumentRepository,
    private readonly familyRepository: FamilyRepository,
    private readonly parentChildrenService: ParentChildrenService,
  ) {}

  async create(
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
              id: participant.id,
            },
          },
        );
      }
      return participant;
    } catch (error) {
      console.error(error);
    }
  }

  async createMarriedParticipants(
    spouses: [ParticipantRequestDTO, ParticipantRequestDTO | undefined],
    family_id: number,
  ): Promise<[ParticipantEntity, ParticipantEntity | null]> {
    const [applicantDto, spouseDto] = spouses;

    const applicant = await this.create({ ...applicantDto, family_id });

    if (spouseDto) {
      const spouse = await this.create({
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
        if (parent) {
          return parent.id;
        }
        return null;
      });
      const childrenList: string[] = [];

      const createdChildrenArray: ParticipantEntity[] = [];

      for (const child of children) {
        const childEntity = await this.create({ ...child, family_id });
        createdChildrenArray.push(childEntity);
        childrenList.push(childEntity.id);
      }

      await this.parentChildrenService.appendChildren(parentList, childrenList);
      return createdChildrenArray;
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: string, dto: DeepPartial<ParticipantEntity>) {
    const data = await this.participantRepository.update(id, {
      ...dto,
    });
    return data;
  }
}

export { ParticipantService };
