import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
class AccountRepository extends Repository<AccountEntity> {
  constructor(dataSource: DataSource) {
    super(AccountEntity, dataSource.createEntityManager());
  }
}

export { AccountRepository };
