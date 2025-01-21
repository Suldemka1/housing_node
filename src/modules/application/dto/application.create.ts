import {
  IsDateString,
  IsEnum,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DocumentType } from '../../document/entities/document.entity';
import { ParticipantRequestDTO } from '../../participant/dto/participant.create';

class DocumentRequestData {
  @IsString()
  @IsOptional()
  id: string;

  @IsEnum(DocumentType)
  type: DocumentType;

  @IsString()
  series: string;

  @IsString()
  number: string;

  @IsDateString()
  issued_date: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  @IsOptional()
  issuer: '';
}

class ApplicationEntityCreateDTO {
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => ParticipantRequestDTO)
  applicant: ParticipantRequestDTO;

  @ValidateNested()
  @IsOptional()
  @Type(() => ParticipantRequestDTO)
  spouse?: ParticipantRequestDTO;

  @ValidateNested()
  @Type(() => ParticipantRequestDTO)
  children: ParticipantRequestDTO[];
}

export { ApplicationEntityCreateDTO, DocumentRequestData };
