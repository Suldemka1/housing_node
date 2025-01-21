import { Injectable } from '@nestjs/common';
import { DocumentEntity, DocumentTypes } from '../entities/document.entity';
import { DocumentRepository } from '../document.repository';

@Injectable()
export class DocumentFactoryService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  createDocument(type: DocumentTypes): DocumentEntity {
    switch (type) {
      case DocumentTypes.PASSPORT:
        return this.createPassport();
      case DocumentTypes.BIRTH_CERTIFICATE:
        return this.createBirthCertificate();
      case DocumentTypes.MARRIAGE_CERTIFICATE:
        return this.createMarriageCertificate();
      default:
        throw new Error(`Document type '${type}' is not supported.`);
    }
  }

  private createPassport(): DocumentEntity {
    const passport = this.documentRepository.create({
      type: DocumentTypes.PASSPORT,
    });
    return passport;
  }

  private createBirthCertificate(): DocumentEntity {
    return this.documentRepository.create({
      type: DocumentTypes.BIRTH_CERTIFICATE,
    });
  }

  private createMarriageCertificate(): DocumentEntity {
    return this.documentRepository.create({
      type: DocumentTypes.MARRIAGE_CERTIFICATE,
    });
  }
}
