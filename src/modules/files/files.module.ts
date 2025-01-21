import { Module } from '@nestjs/common';
import { FileEntity } from './files.entity';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
  exports: [FilesService, FilesRepository],
})
class FileModule {}

export { FileModule };
