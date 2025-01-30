import { QueueType } from '../queue.entity';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

class QueueUpdateDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsEnum(QueueType)
  type: QueueType;

  @IsNumber()
  number: number;
}

export { QueueUpdateDTO };
