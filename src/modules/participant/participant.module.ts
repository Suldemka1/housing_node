import { ParticipantEntity } from './participant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ParticipantRepository } from './participant.repository';
import { ParentChildrenEntity } from '../parent_children/parent_children.entity';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { DocumentModule } from '../document/document.module';
import { FamilyModule } from '../family/family.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParticipantEntity, ParentChildrenEntity]),
    DocumentModule,
    FamilyModule,
  ],
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository],
  exports: [ParticipantService, ParticipantRepository],
})
class ParticipantModule {}

export { ParticipantModule };
