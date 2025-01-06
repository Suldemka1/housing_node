import { FileRepository } from './files.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
class FileService {
  constructor(private fileRepository: FileRepository) {}
}

export { FileService };
