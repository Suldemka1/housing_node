import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FileEntity } from './files.entity';

@Injectable()
class FilesRepository extends Repository<FileEntity> {
  constructor(dataSourse: DataSource) {
    super(FileEntity, dataSourse.createEntityManager());
  }
}

export { FilesRepository };
