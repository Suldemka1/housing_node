import { BadRequestException, Injectable } from '@nestjs/common';
import { QueueRepository } from './queue.repository';
import { QueueEntity } from './queue.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
class QueueService {
  constructor(private queueRepository: QueueRepository) {}

  async update(queue: QueueEntity): Promise<UpdateResult> {
    const originalQueueEntity = await this.queueRepository.findOne({
      where: {
        id: queue.id,
      },
    });

    if (queue.number != originalQueueEntity.number) {
      const isBindable = await this.queueRepository.checkIsQueueBindable(
        queue.type,
        queue.number,
      );
      if (!isBindable) {
        throw new BadRequestException();
      }
    }

    const updateResult = await this.queueRepository.update(
      {
        id: queue.id,
      },
      queue,
    );

    return updateResult;
  }

  async findByApplicationId(id: number): Promise<QueueEntity> {
    return await this.queueRepository.findByApplicationId(id);
  }
}

export { QueueService };
