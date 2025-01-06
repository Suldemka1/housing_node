import { BadRequestException, Injectable } from '@nestjs/common';
import { QueueRepository } from './queue.repository';
import { QueueEntity } from './queue.entity';
import { UpdateResult } from 'typeorm';
import { QueueUpdateDTO } from './dto/queue.update';

@Injectable()
class QueueService {
  constructor(private queueRepository: QueueRepository) {}

  async update(id: number, dto: QueueUpdateDTO): Promise<UpdateResult> {
    const [originalQueueEntity] = await Promise.all([
      this.queueRepository.findOne({
        where: {
          id: id,
        },
      }),
    ]);

    if (
      dto.number != originalQueueEntity.number ||
      dto.type != originalQueueEntity.type
    ) {
      const isBindable = await this.queueRepository.checkIsQueueBindable(
        dto.type,
        dto.number,
      );
      if (!isBindable) {
        throw new BadRequestException();
      }
    }

    const updateResult = await this.queueRepository.update(
      {
        id: id,
      },
      {
        ...dto,
      },
    );

    return updateResult;
  }

  async findByApplicationId(id: number): Promise<QueueEntity> {
    return await this.queueRepository.findByApplicationId(id);
  }
}

export { QueueService };
