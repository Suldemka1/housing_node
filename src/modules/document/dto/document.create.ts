import { DocumentEntity, DocumentTypes } from '../entities/document.entity';

class DocumentEntityCreateDTO {
  type: DocumentTypes;
  series: string;
  number: string;
  unit_code: string;
  issuer: string;
  issued_date: number;

  toDocumentEntity() {
    const documentEntity = new DocumentEntity();

    return documentEntity;
  }
}

export { DocumentEntityCreateDTO };
