import { DocumentService } from './document.service';
import { Controller, Param, Patch, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('document')
class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @UseInterceptors(AnyFilesInterceptor())
  @Patch('/attach/:id')
  async uploadFile(@Param('id') id: number) {
    return id;
  }
}

export { DocumentController };
