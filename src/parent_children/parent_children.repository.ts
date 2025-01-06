import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ParentChildrenEntity } from './parent_children.entity';
import { ParticipantEntity } from '../participant/participant.entity';

@Injectable()
class ParentChildrenRepository extends Repository<ParentChildrenEntity> {
  constructor(dataSource: DataSource) {
    super(ParentChildrenEntity, dataSource.createEntityManager());
  }

  async findChildrenByParentId(
    parentId: number,
  ): Promise<Array<ParticipantEntity>> {
    const result: Array<ParticipantEntity> = [];
    const parentChildrenEntities = await this.find({
      where: {
        parent: {
          id: parentId,
        },
      },
      relations: {
        child: true,
        parent: true,
      },
    });

    for (const relation of parentChildrenEntities) {
      result.push(relation.child);
    }

    return result;
  }

  async onModuleInit(): Promise<void> {
    const parentChildren = await this.findChildrenByParentId(1);
    console.log(parentChildren);
  }
}

export { ParentChildrenRepository };
