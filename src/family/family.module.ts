import { Module } from '@nestjs/common';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';
import { FamilyRepository } from './family.repository';

@Module({
  controllers: [FamilyController],
  providers: [FamilyService, FamilyRepository],
  exports: [FamilyService, FamilyRepository],
})
export class FamilyModule {}
