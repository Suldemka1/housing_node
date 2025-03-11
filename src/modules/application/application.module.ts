import { Module } from '@nestjs/common';
import { ApplicationEntity } from './application.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './services/application.service';
import { ApplicationRepository } from './application.repository';
import { ApplicationController } from './application.controller';
import { QueueModule } from '../queue/queue.module';
import { ParticipantModule } from '../participant/participant.module';
import { RealEstateModule } from '../real_estate/real_estate.module';
import { FamilyModule } from '../family/family.module';
import { ParentChildrenModule } from '../parent_children/parent_children.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity]),
    FamilyModule,
    QueueModule,
    ParticipantModule,
    RealEstateModule,
    ParentChildrenModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository],
  exports: [ApplicationService, ApplicationRepository],
})
class ApplicationModule {}

export { ApplicationModule };
