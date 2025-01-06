import { DocumentEntity, DocumentType } from '../document.entity';

class DocumentEntityCreateDTO {
  type: DocumentType;
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

class Passport extends DocumentEntityCreateDTO {
  constructor() {
    super();
  }
}

export { DocumentEntityCreateDTO };
