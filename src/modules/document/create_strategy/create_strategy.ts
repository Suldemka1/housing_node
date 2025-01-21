import { DocumentEntity, DocumentTypes } from '../entities';
import { NotImplementedException } from '@nestjs/common';

interface DocumentCreator {
  create(): DocumentEntity;
}

class DocumentCreateStrategy implements DocumentCreator {
  constructor(private readonly documentRepository: DocumentRepository) {}

  strategy: DocumentCreator;

  setStrategy(creator: DocumentCreator) {
    this.strategy = creator;
  }

  create(document: DocumentEntity): DocumentEntity {
    const { type } = document;
    if (type === DocumentTypes.PASSPORT) {
    }

    if (type === DocumentTypes.BIRTH_CERTIFICATE) {
    }

    if (type === DocumentTypes.DIVORCE_CERTIFICATE) {
    }

    if (type === DocumentTypes.MARRIAGE_CERTIFICATE) {
    }

    if (type === DocumentTypes.SNILS) {
    }

    throw new NotImplementedException();
  }
}

export { DocumentCreator, DocumentCreateStrategy };
