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
    const { id, type, number } = dto;
    const isQueueBindable = await this.checkIsQueueBindable({
      type,
      number,
    });

    if (!isQueueBindable) {
      const originalQueue = await this.queueRepository.findOne({
        where: { id },
      });

      if (originalQueue.id !== id) {
        throw new ConflictException('queue number already exists');
      }
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
    const queue = await this.queueRepository.find({
      where: {
        type: dto.type,
        number: dto.number,
      },
    });

    return queue.length === 0;
  }

  /*
   * @description validate queue by application id
   */
  async validate(applicationId: number) {
    const errors: string[] = [];

    const queue = await this.queueRepository.findOne({
      where: {
        application: {
          id: applicationId,
        },
      },
    });

    return errors;
  }
}

export { QueueService };
