import { QueueType } from '../queue.entity';
import { IsEnum, IsNumber } from 'class-validator';

class QueueUpdateDTO {
  @IsEnum(QueueType)
  type: QueueType;

  @IsNumber()
  number: number;
}

export { QueueUpdateDTO };
