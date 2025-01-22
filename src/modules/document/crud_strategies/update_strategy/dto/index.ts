import { IsEnum, IsUUID } from 'class-validator';
import { DocumentTypes } from '../../../entities';

class DocumentUpdateDTO {
  @IsUUID()
  id: string;

  @IsEnum(DocumentTypes)
  type: DocumentTypes;
}

class IdentificationUpdateDTO extends DocumentUpdateDTO {}

class PassportUpdateDTO extends IdentificationUpdateDTO {}

class BirthCertificateUpdateDTO extends IdentificationUpdateDTO {}

class FamilyDocumentUpdateDTO extends DocumentUpdateDTO {}

class MarriageCertificateUpdateDTO extends FamilyDocumentUpdateDTO {}

class DivorceCertificateUpdateDTO extends FamilyDocumentUpdateDTO {}

type AnyDocumentUpdateDTO =
  | PassportUpdateDTO
  | BirthCertificateUpdateDTO
  | MarriageCertificateUpdateDTO
  | DivorceCertificateUpdateDTO;

export {
  DocumentUpdateDTO,
  PassportUpdateDTO,
  BirthCertificateUpdateDTO,
  MarriageCertificateUpdateDTO,
  DivorceCertificateUpdateDTO,
  AnyDocumentUpdateDTO,
};
