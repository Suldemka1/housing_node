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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { RoleEntity, RoleTypes };
