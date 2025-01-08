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
    parentId: string,
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

  async appendChildrenToParent(
    parents: Array<string>,
    children: Array<string>,
  ): Promise<boolean> {
    const transactionResult = await this.manager.transaction(
      async (manager) => {
        for (const parentId of parents) {
          for (const childId of children) {
            const relation = manager.create(ParentChildrenEntity, {
              child: {
                id: childId,
              },
              parent: {
                id: parentId,
              },
            });
            await manager.save(relation);
          }
        }

        return true;
      },
    );

    return transactionResult;
  }
}

export { ParentChildrenRepository };
