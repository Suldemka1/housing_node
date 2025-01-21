import { FilesRepository } from './files.repository';
import { Injectable } from '@nestjs/common';
import { FileEntity } from './files.entity';
import * as fs from 'node:fs';
import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { v4 } from 'uuid';

@Injectable()
class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly configService: ConfigService,
  ) {}

  async create(documentId: string, file: Express.Multer.File) {
    const uploadedFile = await this.saveFileToUploadDir(file);
    const { id, filename, filepath } = uploadedFile;
    const fileEntity = this.filesRepository.create({
      id,
      filename,
      filenameDisk: filepath,
      document: {
        id: documentId,
      },
    });

    return await this.filesRepository.save(fileEntity);
  }

  async saveFileToUploadDir(file: Express.Multer.File) {
    const UPLOAD_DIR = this.configService.get<string>('upload.uploadPath');
    const id = v4();
    const extname = path.extname(file.filename);
    const filename = String().concat(id, extname);
    const filepath = path.join(UPLOAD_DIR, filename);
    await fs.promises.writeFile(filepath, file.buffer);

    return {
      id,
      filename,
      filepath,
    };
  }

  async findById(id: string): Promise<FileEntity> {
    const file = await this.filesRepository.findOne({
      where: { id: id },
    });

    return file;
  }
}

export { FilesService };
