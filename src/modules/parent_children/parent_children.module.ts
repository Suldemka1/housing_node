import { ParentChildrenEntity } from './parent_children.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ParentChildrenRepository } from './parent_children.repository';
import { ParentChildrenService } from './parent_children.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParentChildrenEntity])],
  providers: [ParentChildrenService, ParentChildrenRepository],
  exports: [ParentChildrenService, ParentChildrenRepository],
})
class ParentChildrenModule {}

export { ParentChildrenModule };
