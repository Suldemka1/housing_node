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
import { DocumentRepository, PassportRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { FilesRepository } from '../files/files.repository';
import { BirthCertificateRepository } from './repositories/birth_certificate.repository';
import { DocumentCreateStrategy } from './crud_strategies/create_strategy/create_strategy';
import { PassportCreationBehavior } from './crud_strategies/create_strategy/behaviors/passport.behavior';
import { BirthCertificateCreationBehavior } from './crud_strategies/create_strategy/behaviors/birth_certificate.behavior';
import { MarriageCertificateCreationBehavior } from './crud_strategies/create_strategy/behaviors/marriage_certificate.behavior';
import { DivorceCertificateCreationBehavior } from './crud_strategies/create_strategy/behaviors/divorce_certificate.behavior';
import { DocumentUpdateStrategy } from './crud_strategies/update_strategy/update_strategy';
import { PassportUpdateBehavior } from './crud_strategies/update_strategy/behaviors/passport.behavior';
import { BirthCertificateUpdateBehavior } from './crud_strategies/update_strategy/behaviors/birth_certificate.behavior';
import { DivorceCertificateUpdateBehavior } from './crud_strategies/update_strategy/behaviors/divorce_certificate.behavior';
import { MarriageCertificateUpdateBehavior } from './crud_strategies/update_strategy/behaviors/marriage_certificate.behavior';

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
    // services
    DocumentService,
    DocumentFactoryService,
    // repos
    DocumentRepository,
    PassportRepository,
    BirthCertificateRepository,
    FilesRepository,
    // create strategy
    DocumentCreateStrategy,
    PassportCreationBehavior,
    BirthCertificateCreationBehavior,
    MarriageCertificateCreationBehavior,
    DivorceCertificateCreationBehavior,
    // update strategy
    DocumentUpdateStrategy,
    PassportUpdateBehavior,
    BirthCertificateUpdateBehavior,
    DivorceCertificateUpdateBehavior,
    MarriageCertificateUpdateBehavior,
  ],
  exports: [
    DocumentService,
    DocumentFactoryService,
    DocumentRepository,
    DocumentCreateStrategy,
  ],
})
export class DocumentModule {}
