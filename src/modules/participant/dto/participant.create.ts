import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { DocumentRequestData } from '../../application/dto/application.create';
import { Type } from 'class-transformer';

class ParticipantRequestDTO {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  surname: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsArray()
  @ValidateNested()
  @Type(() => DocumentRequestData)
  documents: DocumentRequestData[];
}

class ParticipantCreateEntityDTO {
  @IsString()
  surname: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsNumber()
  family_id: number;

  @IsOptional()
  @IsUUID()
  spouse_id?: string;

  documents: DocumentRequestData[];
}

export { ParticipantRequestDTO, ParticipantCreateEntityDTO };
