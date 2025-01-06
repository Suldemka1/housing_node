import { Module } from '@nestjs/common';
import { QueueEntity } from './queue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueService } from './queue.service';
import { QueueRepository } from './queue.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QueueEntity])],
  providers: [QueueService, QueueRepository],
  exports: [QueueService, QueueRepository],
})
class QueueModule {}

export { QueueModule };
