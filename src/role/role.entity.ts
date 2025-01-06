import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

enum RoleTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('role')
class RoleEntity {
  @PrimaryColumn({
    enum: RoleTypes,
  })
  name: RoleTypes;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

export { RoleEntity, RoleTypes };
