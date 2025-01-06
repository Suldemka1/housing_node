import { Injectable } from '@nestjs/common';
import FamilyEntity from './family.entity';
import { FamilyRepository } from './family.repository';

@Injectable()
export class FamilyService {
  constructor(private readonly familyRepository: FamilyRepository) {}

  async updateFamily(id: number, family: FamilyEntity) {
    return await this.familyRepository.update(id, family);
  }
}
