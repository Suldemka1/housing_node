import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FileEntity } from './files.entity';

@Injectable()
class FileRepository extends Repository<File> {
  constructor(dataSourse: DataSource) {
    super(FileEntity, dataSourse.createEntityManager());
  }
}

export { FileRepository };
