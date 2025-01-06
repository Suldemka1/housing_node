import { Controller, Get, Param } from '@nestjs/common';
import { ParticipantService } from './participant.service';

@Controller('participant')
class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get('/:id')
  async getParticipant(@Param('id') id: string) {}
}

export { ParticipantController };
