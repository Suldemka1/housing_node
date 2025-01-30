import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationUpdateEntityDTO } from './dto/application.update';
import { ApplicationEntityCreateDTO } from './dto/application.create';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { QueueService } from '../queue/queue.service';
import { AuthGuard } from '../../common/guards';
import { ParticipantService } from '../participant/participant.service';

@UseGuards(AuthGuard)
@Controller('application')
class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly participantService: ParticipantService,
    private readonly queueService: QueueService,
  ) {}

  @Post('/')
  @UseInterceptors(AnyFilesInterceptor())
  async createApplication(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: ApplicationEntityCreateDTO,
  ) {
    try {
      const data = await this.applicationService.createDraftApplication(body);
      return { data: data };
    } catch (error) {
      throw error;
    }
  }

  @Post('/setQueue/:id')
  async setQueue(@Param('id') id: number) {
    return { data: id };
  }

  @Get('/')
  async getDraftApplications() {
    const data = await this.applicationService.getDraftApplications();
    return { data };
  }

  @Get('/:id')
  async getDraftApplicationById(@Param('id') id: number) {
    const data = await this.applicationService.getApplicationById(id);

    return { data };
  }

  @Patch('/:id')
  async updateApplication(
    @Param('id') id: string,
    @Body() body: ApplicationUpdateEntityDTO,
  ) {
    try {
      const { application, applicant, spouse, children, family, queue } = body;
      const originalApplication =
        await this.applicationService.getApplicationById(Number(id));
      if (!originalApplication) {
        throw new NotFoundException('application not found');
      }

      if (application) {
        await this.applicationService.updateApplication(application);
      }

      if (applicant) {
        await this.participantService.update(applicant.id, applicant);
      }

      if (spouse && spouse.id) {
        await this.participantService.update(spouse.id, spouse);
      }

      if (queue) {
        await this.queueService.updateByApplicationId(
          originalApplication.id,
          queue,
        );
      }

      if (originalApplication.children.length > children.length) {
      } else if (originalApplication.children.length < children.length) {
      } else {
      }

      const data = await this.applicationService.getApplicationById(Number(id));

      return { data };
    } catch (e) {
      throw e;
    }
  }

  @Delete('/:id')
  async deleteApplication(@Param('id') id: number) {
    const data = await this.applicationService.deleteApplication(id);
    return { data };
  }
}

export { ApplicationController };
