import { ConflictException, Injectable } from '@nestjs/common';
import { QueueRepository } from './queue.repository';
import { UpdateResult } from 'typeorm';
import { QueueUpdateDTO } from './dto/queue.update';

@Injectable()
class QueueService {
  constructor(private queueRepository: QueueRepository) {}

  async updateByApplicationId(
    applicationId: number,
    dto: QueueUpdateDTO,
  ): Promise<UpdateResult> {
    const { type, number } = dto;
    const isQueueBindable = await this.checkIsQueueBindable({
      type,
      number,
    });

    if (!isQueueBindable) {
      throw new ConflictException('queue number already exists');
    }

    return await this.queueRepository.update(
      {
        application: {
          id: applicationId,
        },
      },
      {
        type: dto.type,
        number: dto.number,
      },
    );
  }

  async checkIsQueueBindable(
    dto: Omit<QueueUpdateDTO, 'id'>,
  ): Promise<boolean> {
    let isBindable = false;
    const queue = await this.queueRepository.find({
      where: {
        type: dto.type,
        number: dto.number,
      },
    });

    isBindable = queue.length === 0;

    return isBindable;
  }
}

export { QueueService };
