import { ParentChildrenEntity } from './parent_children.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ParentChildrenRepository } from './parent_children.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ParentChildrenEntity])],
  providers: [ParentChildrenRepository],
})
class ParentChildrenModule {}

export { ParentChildrenModule };
