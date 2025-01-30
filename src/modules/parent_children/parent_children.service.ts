import { Injectable } from '@nestjs/common';
import { ParentChildrenRepository } from './parent_children.repository';
import { UpdateParticipantDTO } from '../application/dto/application.update';

@Injectable()
class ParentChildrenService {
  constructor(
    private readonly parentChildrenRepository: ParentChildrenRepository,
  ) {}

  async appendChildren(
    parents: Array<string>,
    children: Array<string>,
  ): Promise<boolean> {
    return await this.parentChildrenRepository.appendChildrenToParent(
      parents,
      children,
    );
  }

  async updateChildrenList(children: UpdateParticipantDTO[]) {
    for (const child of children) {
      if (child.id) {
      }
    }
  }
}

export { ParentChildrenService };
