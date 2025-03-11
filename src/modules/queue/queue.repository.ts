import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { QueueEntity, QueueType } from './queue.entity';

@Injectable()
class QueueRepository extends Repository<QueueEntity> {
  constructor(dataSource: DataSource) {
    super(QueueEntity, dataSource.createEntityManager());
  }

  async createDraft(applicationId: number, queueNumber: number) {
    const queue = this.create({
      type: QueueType.DRAFT,
      number: queueNumber,
      application: {
        id: applicationId,
      },
    });
    return await this.save(queue);
  }
}

export { QueueRepository };
