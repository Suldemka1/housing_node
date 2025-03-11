import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
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

  @IsNumber()
  queue_number: number;

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
  issuer: '';

  @IsOptional()
  @IsDateString()
  birthdate?: string;
}

class FamilyRequestDTO {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => DocumentRequestData)
  documents?: DocumentRequestData[];
}

export class RealEstateDTO {
  @IsNumber()
  sqm_price: number;

  @IsNumber()
  full_price: number;

  @IsNumber()
  support_amount: number;

  @IsNumber()
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

  @ValidateNested()
  @Type(() => FamilyRequestDTO)
  family: FamilyRequestDTO;

  @ValidateNested()
  @Type(() => RealEstateDTO)
  real_estate: RealEstateDTO;
}

export { ApplicationEntityCreateDTO, DocumentRequestData };
