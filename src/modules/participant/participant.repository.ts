import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ParticipantEntity } from './participant.entity';
import {
  ParticipantCreateEntityDTO,
  ParticipantRequestDTO,
} from './dto/participant.create';
import { AnyDocumentCreateDTO } from '../document/crud_strategies/create_strategy/dto';
import { DocumentEntity } from '../document/entities';

@Injectable()
class ParticipantRepository extends Repository<ParticipantEntity> {
  constructor(dataSource: DataSource) {
    super(ParticipantEntity, dataSource.createEntityManager());
  }

  async findByApplicationId(
    applicationId: number,
  ): Promise<ParticipantEntity[]> {
    return await this.find({
      where: {
        application: {
          id: applicationId,
        },
      },
      relations: {
        application: true,
      },
    });
  }
}

export { ParticipantRepository };
