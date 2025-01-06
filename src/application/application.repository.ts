import { Injectable } from '@nestjs/common';
import { ApplicationEntity } from './application.entity';
import { DataSource, Repository } from 'typeorm';
import { ParticipantEntity } from '../participant/participant.entity';
import { QueueEntity } from '../queue/queue.entity';

@Injectable()
class ApplicationRepository extends Repository<ApplicationEntity> {
  constructor(dataSource: DataSource) {
    super(ApplicationEntity, dataSource.createEntityManager());
  }

  async setApplicant(applicationId: number, applicant: ParticipantEntity) {
    const updateResult = await this.update(applicationId, {
      applicant: applicant,
    });

    return updateResult;
  }

  async setQueue(applicationId: number, queue: QueueEntity) {
    const updateResult = await this.update(applicationId, {
      queue: queue,
    });

    return updateResult;
  }
}

export { ApplicationRepository };
