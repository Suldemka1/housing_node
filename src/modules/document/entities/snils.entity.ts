import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { DocumentEntity } from './document.entity';

@Entity()
class SnilsEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => DocumentEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
  })
  document: DocumentEntity;
}

export { SnilsEntity };
