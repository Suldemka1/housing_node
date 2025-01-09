import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './document.repository';
import { DocumentEntityCreateDTO } from './dto/document.create';
import moment from 'moment';
import { FilesRepository } from '../files/files.repository';
import { DocumentUpdateEntityDTO } from './dto/document.update';
import { DeepPartial } from 'typeorm';
import { DocumentEntity } from './document.entity';

@Injectable()
export class DocumentService {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly filesRepository: FilesRepository,
  ) {}

  async create(dto: DeepPartial<DocumentEntity>) {
    const document = this.documentRepository.create({
      ...dto,
      issuedDate: new Date(),
    });
    return await this.documentRepository.save(document);
  }

  async update(id: string, dto: DocumentUpdateEntityDTO) {
    const document = await this.documentRepository.update(id, {
      type: dto.type,
      series: dto.series,
      number: dto.number,
      birthdate: dto.birthdate,
      unitCode: dto.unit_code,
      issuer: dto.issuer,
      issuedDate: dto.issuedDate,
    });

    return document;
  }
}
