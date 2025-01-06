import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from 'express';

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
  async getDraftApplicationById(@Param('id') id: number) {}

  @Patch('/:id')
  async updateApplication(
    @Param('id') id: number,
    @Body() application: Application,
  ) {}

  @Delete('/:id')
  async deleteApplication(@Param('id') id: number) {
    const data = await this.applicationService.deleteApplication(id);
    return { data };
  }
}

export { ApplicationController };
