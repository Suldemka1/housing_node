import { Module } from '@nestjs/common';
import { FileEntity } from './files.entity';
import { FileRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileRepository],
  exports: [FileRepository],
})
class FileModule {}

export { FileModule };
