import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { QueueEntity, QueueType } from './queue.entity';

@Injectable()
class QueueRepository extends Repository<QueueEntity> {
  constructor(dataSource: DataSource) {
    super(QueueEntity, dataSource.createEntityManager());
  }

  async createDraft() {
    const queue = this.create();
    return await this.save(queue);
  }

  async findByApplicationId(id: number): Promise<QueueEntity> {
    const queue = await this.findOne({
      where: {
        application: {
          id,
        },
      },
    });

    return queue;
  }

  async checkIsQueueBindable(
    type: QueueType,
    number: number,
  ): Promise<boolean> {
    const queues = await this.find({
      where: {
        number,
        type,
      },
    });

    return queues.length === 0;
  }
}

export { QueueRepository };
