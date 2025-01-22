import { DataSource, Repository } from 'typeorm';
import { BirthCertificateEntity } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
class BirthCertificateRepository extends Repository<BirthCertificateEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BirthCertificateEntity, dataSource.createEntityManager());
  }
}

export { BirthCertificateRepository };
