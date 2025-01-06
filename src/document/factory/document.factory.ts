import { Injectable } from '@nestjs/common';
import { DocumentEntity, DocumentType } from '../document.entity';
import { DocumentRepository } from '../document.repository';

@Injectable()
export class DocumentFactoryService {
  constructor(private readonly documentRepository: DocumentRepository) {}
  createDocument(type: DocumentType): DocumentEntity {
    switch (type) {
      case DocumentType.PASSPORT:
        return this.createPassport();
      case DocumentType.CERTIFICATE:
        return this.createBirthCertificate();
      case DocumentType.MARRIAGE_CERTIFICATE:
        return this.createMarriageCertificate();
      default:
        throw new Error(`Document type '${type}' is not supported.`);
    }
  }

  private createPassport(): DocumentEntity {
    const passport = this.documentRepository.create({
      type: DocumentType.PASSPORT,
    });
    return passport;
  }

  private createBirthCertificate(): DocumentEntity {
    return this.documentRepository.create({
      type: DocumentType.CERTIFICATE,
    });
  }

  private createMarriageCertificate(): DocumentEntity {
    return this.documentRepository.create({
      type: DocumentType.MARRIAGE_CERTIFICATE,
    });
  }
}
