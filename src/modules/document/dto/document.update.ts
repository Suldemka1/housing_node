import { DocumentTypes } from '../entities/document.entity';
import { IsDateString, IsOptional, IsString } from 'class-validator';

class DocumentUpdateEntityDTO {
  @IsOptional()
  @IsString()
  type?: DocumentTypes;

  @IsOptional()
  @IsString()
  series?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  unit_code?: string;

  @IsOptional()
  @IsDateString()
  issued_date?: Date;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  @IsString()
  issuer?: string;

  // toDocumentEntity = (id: string) => {
  //   const document = new DocumentEntity();
  //
  //   document.id = id;
  //   document.type = this.type;
  //   document.series = this.series;
  //   document.number = this.number;
  //   document.unitCode = this.unit_code;
  //   document.issuer = this.issuer;
  //   document.issuedDate = this.issued_date;
  //
  //   return document;
  // };
}

export { DocumentUpdateEntityDTO };
