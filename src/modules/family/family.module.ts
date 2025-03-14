import { forwardRef, Module } from '@nestjs/common';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';
import { FamilyRepository } from './family.repository';
import FamilyEntity from './family.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentModule } from '../document/document.module';
import { ParentChildrenModule } from '../parent_children/parent_children.module';
import { ParticipantModule } from '../participant/participant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FamilyEntity]),
    DocumentModule,
    ParentChildrenModule,
    forwardRef(() => ParticipantModule),
  ],
  controllers: [FamilyController],
  providers: [FamilyService, FamilyRepository],
  exports: [FamilyService, FamilyRepository],
})
export class FamilyModule {}
