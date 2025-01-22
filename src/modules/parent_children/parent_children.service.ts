import { Injectable } from '@nestjs/common';
import { ParentChildrenRepository } from './parent_children.repository';

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
}

export { ParentChildrenService };
