import { DocumentEntity, DocumentType } from '../document.entity';

class DocumentEntityCreateDTO {
  type: DocumentType;
  series: string;
  number: string;
  unit_code: string;
  issuer: string;
  issuedDate: number;

  toDocumentEntity() {
    const documentEntity = new DocumentEntity();

    return documentEntity;
  }
}

export { DocumentEntityCreateDTO };
