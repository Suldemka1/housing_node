import { FilesRepository } from './files.repository';
import { Injectable } from '@nestjs/common';
import { FileEntity } from './files.entity';

@Injectable()
class FilesService {
  constructor(private filesRepository: FilesRepository) {}

  async findById(id: string): Promise<FileEntity> {
    const file = await this.filesRepository.findOne({
      where: { id: id },
    });

    return file;
  }
}

export { FilesService };
