import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationUpdateEntityDTO } from './dto/application.update';
import { ApplicationEntityCreateDTO } from './dto/application.create';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('application')
class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

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

  @Get('/draft')
  async getDraftApplications() {
    const data = await this.applicationService.getDraftApplications();
    return { data };
  }

  @Get('/:id')
  async getDraftApplicationById(@Param('id') id: number) {
    const application = await this.applicationService.getApplicationById(id);

    return {
      data: application,
    };
  }

  @Patch('/:id')
  async updateApplication(
    @Param('id') id: string,
    @Body() body: ApplicationUpdateEntityDTO,
  ) {
    const { applicant, spouse, children, family, queue } = body;

    return { data: body };
  }

  @Delete('/:id')
  async deleteApplication(@Param('id') id: number) {
    const data = await this.applicationService.deleteApplication(id);
    return { data };
  }
}

export { ApplicationController };
