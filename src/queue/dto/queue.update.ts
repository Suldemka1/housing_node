import { QueueEntity, QueueType } from '../queue.entity';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

class QueueUpdateDTO {
  @IsEnum(QueueEntity)
  @IsOptional()
  type?: QueueType;

  @IsNumber()
  @IsOptional()
  number?: number;
}

export { QueueUpdateDTO };
