import { DataSource, Repository } from 'typeorm';
import { PassportEntity } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
class PassportRepository extends Repository<PassportEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PassportEntity, dataSource.createEntityManager());
  }
}

export { PassportRepository };
