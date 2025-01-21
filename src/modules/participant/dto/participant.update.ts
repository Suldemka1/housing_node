import { IsOptional, IsString } from 'class-validator';

class ParticipantUpdateEntityDTO {
  @IsString()
  @IsOptional()
  surname: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  patronymic: string;
}

export { ParticipantUpdateEntityDTO };
