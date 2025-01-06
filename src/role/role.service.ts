import { RoleRepository } from './role.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
class RoleService {
  constructor(private roleRepository: RoleRepository) {}
}

export { RoleService };
