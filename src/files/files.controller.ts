import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';

@Controller('files')
class FilesController {
  constructor(private filesService: FilesService) {}

  @Get('/:id')
  async getFile(@Res() res: Response, @Param('id') id: string) {
    const file = await this.filesService.findById(id);
    res.sendFile(file.filename_disk);
  }
}

export { FilesController };
