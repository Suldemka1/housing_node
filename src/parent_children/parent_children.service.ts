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
    const appendResult =
      await this.parentChildrenRepository.appendChildrenToParent(
        parents,
        children,
      );

    return appendResult;
  }
}

export { ParentChildrenService };
