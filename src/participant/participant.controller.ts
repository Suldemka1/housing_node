import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantUpdateEntityDTO } from './dto/participant.update';

@Controller('participant')
class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get('/:id')
  async getParticipant(@Param('id') id: string) {}

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: ParticipantUpdateEntityDTO,
  ) {
    const data = await this.participantService.update(Number(id), body);

    return { data: data };
  }
}

export { ParticipantController };
