import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DocumentTypes } from '../../document/entities';
import { ParticipantRequestDTO } from '../../participant/dto/participant.create';
import { ApplicationStatus } from '../application.entity';

class ApplicationRequestData {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @IsString()
  reason: string;

  @IsDateString()
  accepted_at: string;
}

class DocumentRequestData {
  @IsString()
  @IsOptional()
  id?: string;

  @IsEnum(DocumentTypes)
  type: DocumentTypes;

  @IsString()
  series: string;

  @IsString()
  number: string;

  @IsDateString()
  issued_date: string;

  @IsString()
  @IsOptional()
  issuer?: '';

  @IsDateString()
  @IsOptional()
  birthdate?: string;
}

class FamilyRequestDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => DocumentRequestData)
  documents: DocumentRequestData[];
}

class RealEstateDTO {
  sqm_price: number;
  full_price: number;
  support_amount: number;
  area: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => DocumentRequestData)
  documents?: DocumentRequestData[];
}

class ApplicationEntityCreateDTO {
  @ValidateNested()
  @Type(() => ApplicationRequestData)
  application: ApplicationRequestData;

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

  @IsOptional()
  @ValidateNested()
  @Type(() => FamilyRequestDTO)
  family?: FamilyRequestDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => RealEstateDTO)
  real_estate: RealEstateDTO;
}

export { ApplicationEntityCreateDTO, DocumentRequestData };
