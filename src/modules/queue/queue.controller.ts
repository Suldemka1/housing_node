import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueUpdateDTO } from './dto/queue.update';
import { ApplicationService } from '../application/application.service';

@Controller('queue')
class QueueController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly queueService: QueueService,
  ) {}

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: QueueUpdateDTO) {
    const application = await this.applicationService.getApplicationById(id);
    if (!application) {
      throw new NotFoundException('application not found');
    }

    return await this.queueService.updateByApplicationId(id, body);
  }
}

export { QueueController };
