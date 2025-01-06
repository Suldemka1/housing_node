import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './document.repository';
import { DocumentEntityCreateDTO } from './dto/document.create';
import moment from 'moment';
import { FileRepository } from '../files/files.repository';

@Injectable()
export class DocumentService {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly fileRepository: FileRepository,
  ) {}

  create(dto: DocumentEntityCreateDTO) {
    const document = this.documentRepository.create({
      ...dto,
      issued_date: moment(dto.issued_date).format('yyyy-mm-dd'),
    });
    return this.documentRepository.save(document);
  }
}
