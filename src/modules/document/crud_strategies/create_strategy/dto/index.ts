import { DocumentTypes } from '../../../entities';
import { IsEnum } from 'class-validator';

class DocumentCreateDTO {
  @IsEnum(DocumentTypes)
  type: DocumentTypes;
}

// identification documents creation types declaration start
class IdentificationDocumentCreateDTO extends DocumentCreateDTO {
  series: string;
  number: string;
  unit_code?: string;
  issuer: string;
  issued_date: string;
  birthdate?: string;
}

class PassportCreateDTO extends IdentificationDocumentCreateDTO {}

class BirthCertificateCreateDTO extends IdentificationDocumentCreateDTO {}

// identification documents creation types declaration end

// family documents creation types declaration start
class FamilyDocumentCreateDTO extends DocumentCreateDTO {
  series: string;
  number: string;
  issuer: string;
  issued_date: string;
}

class MarriageCertificateCreateDTO extends FamilyDocumentCreateDTO {}

class DivorceCertificateCreateDTO extends FamilyDocumentCreateDTO {}

// family documents creation types declaration end

type AnyDocumentCreateDTO =
  | PassportCreateDTO
  | BirthCertificateCreateDTO
  | MarriageCertificateCreateDTO
  | DivorceCertificateCreateDTO;

export {
  AnyDocumentCreateDTO,
  PassportCreateDTO,
  BirthCertificateCreateDTO,
  MarriageCertificateCreateDTO,
  DivorceCertificateCreateDTO,
};
