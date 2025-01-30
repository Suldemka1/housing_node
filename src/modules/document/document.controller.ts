import { DocumentService } from './document.service';
import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { DocumentUpdateEntityDTO } from './dto/document.update';
import { DocumentDeleteAttachmentDTO } from './dto/document.files';
import { AnyDocumentUpdateDTO } from './crud_strategies/update_strategy/dto';

@Controller('document')
class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Patch(':id')
  async updateDocument(
    @Param('id') id: string,
    @Body() body: DocumentUpdateEntityDTO,
  ) {
    const data = await this.documentService.update(
      body as AnyDocumentUpdateDTO,
    );

    return {
      data,
    };
  }

  @Delete(':id')
  async deleteDocument(@Res() res, @Param() id: string) {
    const data = await this.documentService.delete(id);
    if (data.affected > 0) {
      return res.status(HttpStatus.NO_CONTENT);
    } else {
      return res.status(HttpStatus.NOT_FOUND);
    }
  }

  // TODO: need to implement attachment upload process
  @UseInterceptors(AnyFilesInterceptor())
  @Post('/attach/:id')
  async uploadFile(@Param('id') id: string, @UploadedFiles() files: File[]) {
    return id;
  }

  // TODO: need to implement attachment remove process
  @Delete('/attach/:id')
  async deleteAttachment(
    @Param('id') id: string,
    @Body() body: DocumentDeleteAttachmentDTO,
  ) {
    const { files } = body;

    console.log(files);
  }
}

export { DocumentController };
