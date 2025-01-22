import { Module } from '@nestjs/common';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';
import { FamilyRepository } from './family.repository';
import FamilyEntity from './family.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentModule } from '../document/document.module';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyEntity]), DocumentModule],
  controllers: [FamilyController],
  providers: [FamilyService, FamilyRepository],
  exports: [FamilyService, FamilyRepository],
})
export class FamilyModule {}
