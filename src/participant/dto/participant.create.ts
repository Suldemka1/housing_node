import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DocumentRequestData } from '../../application/dto/application.create';

class ParticipantRequestDTO {
  @IsOptional()
  @IsString()
  id?: number;

  @IsString()
  surname: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsArray()
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
  familyId: number;

  @IsOptional()
  @IsUUID()
  spouseId?: string;

  documents: DocumentRequestData[];
}

export { ParticipantRequestDTO, ParticipantCreateEntityDTO };
