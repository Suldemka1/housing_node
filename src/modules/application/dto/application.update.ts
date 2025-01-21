import { ApplicationStatus } from '../application.entity';
import { QueueType } from '../../queue/queue.entity';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateApplicationDTO {
  @IsNumber()
  id: number;

  @IsString()
  reason: string;

  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateDocumentDTO)
  documents: UpdateDocumentDTO[];
}

class UpdateDocumentDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  series: string;

  @IsString()
  number: string;

  @IsString()
  unit_code: string;

  @IsDateString()
  issued_date: string;

  @IsString()
  issuer: string;
}

class UpdatePassportDTO {
  @IsString()
  series: string;

  @IsString()
  number: string;

  @IsString()
  unit_code: string;

  @IsDateString()
  issued_date: string;

  @IsString()
  issuer: string;
}

class UpdateParticipantDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  surname: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  patronymic: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdatePassportDTO)
  passport: UpdatePassportDTO;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateDocumentDTO)
  documents: UpdateDocumentDTO[];
}

class UpdateRealEstateDTO {
  @IsNumber()
  area: number;

  @IsNumber()
  sqm_price: number;

  @IsNumber()
  support_amount: number;

  @IsNumber()
  full_price: number;
}

class UpdateFamilyDTO {
  @IsBoolean()
  is_large: boolean;

  @IsBoolean()
  is_married: boolean;
}

class UpdateQueueDTO {
  @IsEnum(QueueType)
  type: QueueType;

  @IsNumber()
  number: number;
}

class ApplicationUpdateEntityDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateApplicationDTO)
  application: UpdateApplicationDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateParticipantDTO)
  applicant: UpdateParticipantDTO;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateParticipantDTO)
  spouse?: UpdateParticipantDTO;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateParticipantDTO)
  children: Array<UpdateParticipantDTO>;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateRealEstateDTO)
  real_estate: UpdateRealEstateDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateFamilyDTO)
  family: UpdateFamilyDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateQueueDTO)
  queue: UpdateQueueDTO;
}

export { ApplicationUpdateEntityDTO };
