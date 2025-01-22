import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { QueueEntity, QueueType } from './queue.entity';

@Injectable()
class QueueRepository extends Repository<QueueEntity> {
  constructor(dataSource: DataSource) {
    super(QueueEntity, dataSource.createEntityManager());
  }

  async createDraft() {
    const queue = this.create({
      type: QueueType.DRAFT,
    });
    return await this.save(queue);
  }
}

export { QueueRepository };
