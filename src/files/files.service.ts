import { FilesRepository } from './files.repository';
import { Injectable } from '@nestjs/common';
import { FileEntity } from './files.entity';
import * as fs from 'node:fs';

@Injectable()
class FilesService {
  constructor(private filesRepository: FilesRepository) {}

  async create(documentId: string, file: Express.Multer.File) {
    const fileEntity = this.filesRepository.create({
      filename: file.filename,
      filename_disk: file.originalname,
      document: {
        id: documentId,
      },
      ...file,
    });

    fs.writeFile(file.originalname, file.buffer, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return await this.filesRepository.save(fileEntity);
  }

  async findById(id: string): Promise<FileEntity> {
    const file = await this.filesRepository.findOne({
      where: { id: id },
    });

    return file;
  }
}

export { FilesService };
