import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from 'express';
import { ApplicationUpdateEntityDTO } from './dto/application.update';

@Controller('application')
class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/')
  async createApplication() {
    const data = await this.applicationService.createDraftApplication();
    return { data };
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
    return await this.applicationService.getApplicationById(id);
  }

  @Patch('/:id')
  async updateApplication(
    @Param('id') id: string,
    @Body() body: ApplicationUpdateEntityDTO,
  ) {
    console.log(id);
    console.log(body);

    return { data: body };
  }

  @Delete('/:id')
  async deleteApplication(@Param('id') id: number) {
    const data = await this.applicationService.deleteApplication(id);
    return { data };
  }
}

export { ApplicationController };
