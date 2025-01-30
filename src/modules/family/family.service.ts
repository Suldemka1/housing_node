import { Injectable } from '@nestjs/common';
import FamilyEntity from './family.entity';
import { FamilyRepository } from './family.repository';
import { DocumentCreateStrategy } from '../document/crud_strategies/create_strategy/create_strategy';
import { DocumentRepository } from '../document/repositories';

@Injectable()
export class FamilyService {
  constructor(
    private readonly familyRepository: FamilyRepository,
    private readonly documentCreateStrategy: DocumentCreateStrategy,
    private readonly documentRepository: DocumentRepository,
  ) {}

  async createFamily(dto): Promise<FamilyEntity> {
    const { isLarge, isMarried, documents } = dto;

    const familyObject = this.familyRepository.create({
      isMarried,
      isLarge,
    });

    const family = await this.familyRepository.save(familyObject);
    await this.createFamilyDocuments(family.id, documents);

    return family;
  }

  async createFamilyDocuments(familyId: number, documents) {
    try {
      if (documents) {
        for (const document of documents) {
          const newDocument =
            await this.documentCreateStrategy.create(document);
          const updatedDocument = await this.documentRepository.update(
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
