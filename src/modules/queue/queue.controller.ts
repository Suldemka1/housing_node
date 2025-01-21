import { Body, Controller, Param, Patch } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueUpdateDTO } from './dto/queue.update';

@Controller('queue')
class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: QueueUpdateDTO) {
    return await this.queueService.update(id, body);
  }
}

export { QueueController };
