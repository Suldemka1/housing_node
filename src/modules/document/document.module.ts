import { Module } from '@nestjs/common';
import {
  BirthCertificateEntity,
  DivorceCertificateEntity,
  DocumentEntity,
  MarriageCertificateEntity,
  PassportEntity,
  SnilsEntity,
} from './entities';
import { DocumentFactoryService } from './factory/document.factory';
import { DocumentRepository } from './document.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { FilesRepository } from '../files/files.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentEntity,
      PassportEntity,
      BirthCertificateEntity,
      DivorceCertificateEntity,
      MarriageCertificateEntity,
      SnilsEntity,
    ]),
  ],
  controllers: [DocumentController],
  providers: [
    DocumentService,
    DocumentRepository,
    DocumentFactoryService,
    FilesRepository,
  ],
  exports: [DocumentService, DocumentFactoryService, DocumentRepository],
})
export class DocumentModule {}
