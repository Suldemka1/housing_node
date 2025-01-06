import { Module } from '@nestjs/common';
import { DocumentEntity } from './document.entity';
import { DocumentFactoryService } from './factory/document.factory';
import { DocumentRepository } from './document.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { FileRepository } from '../files/files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity])],
  controllers: [DocumentController],
  providers: [
    DocumentService,
    DocumentRepository,
    DocumentFactoryService,
    FileRepository,
  ],
  exports: [DocumentService, DocumentFactoryService, DocumentRepository],
})
export class DocumentModule {}
