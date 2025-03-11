import { Injectable } from '@nestjs/common';
import FamilyEntity from './family.entity';
import { FamilyRepository } from './family.repository';
import { DocumentCreateStrategy } from '../document/crud_strategies/create_strategy/create_strategy';
import { DocumentRepository } from '../document/repositories';
import { ApplicationEntityCreateDTO } from '../application/dto/application.create';
import { ParticipantService } from '../participant/participant.service';

type CreateFamilyEntityDTO = Pick<
  ApplicationEntityCreateDTO,
  'family' | 'applicant' | 'spouse' | 'children'
>;

type CreateFamilyParticipantsDTO = Pick<
  ApplicationEntityCreateDTO,
  'applicant' | 'spouse' | 'children'
>;

@Injectable()
export class FamilyService {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly participantService: ParticipantService,
    private readonly documentCreateStrategy: DocumentCreateStrategy,
    private readonly documentRepository: DocumentRepository,
  ) {}

  async createFamily(dto: CreateFamilyEntityDTO) {
    const isMarried = dto.spouse !== undefined;
    const isLarge = dto.children?.length > 2;
    const documents = dto.family?.documents;

    const familyObject = this.familyRepository.create({
      isMarried,
      isLarge,
    });

    const family = await this.familyRepository.save(familyObject);
    const applicant = await this.createFamilyParticipants(dto, family.id);
    await this.createFamilyDocuments(family.id, documents);
    return {
      family,
      applicant,
    };
  }

  async createFamilyParticipants(
    dto: CreateFamilyParticipantsDTO,
    familyId: number,
  ) {
    const [applicant, spouse] =
      await this.participantService.createMarriedParticipants(
        [dto.applicant, dto.spouse],
        familyId,
      );

    await this.participantService.createChildren(
      dto.children,
      [applicant, spouse],
      familyId,
    );

    return applicant;
  }

  async createFamilyDocuments(familyId: number, documents) {
    try {
      if (documents) {
        for (const document of documents) {
          const newDocument =
            await this.documentCreateStrategy.create(document);
          await this.documentRepository.update(
            {
              id: newDocument.id,
            },
            {
              family: {
                id: familyId,
              },
            },
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async updateFamily(family: FamilyEntity) {
    return await this.familyRepository.update(family.id, family);
  }
}
