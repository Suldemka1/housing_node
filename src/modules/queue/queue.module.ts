import { Module } from '@nestjs/common';
import { QueueEntity } from './queue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueService } from './queue.service';
import { QueueRepository } from './queue.repository';
import { QueueController } from './queue.controller';
import { ApplicationService } from '../application/application.service';
import { ApplicationRepository } from '../application/application.repository';
import { RealEstateModule } from '../real_estate/real_estate.module';
import { FamilyModule } from '../family/family.module';
import { ParticipantModule } from '../participant/participant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QueueEntity]),
    RealEstateModule,
    FamilyModule,
    ParticipantModule,
  ],
  controllers: [QueueController],
  providers: [
    ApplicationService,
    ApplicationRepository,
    QueueService,
    QueueRepository,
  ],
  exports: [QueueService, QueueRepository],
})
class QueueModule {}

export { QueueModule };
