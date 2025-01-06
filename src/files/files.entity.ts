import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DocumentEntity } from '../document/document.entity';

@Entity({
  name: 'files',
})
class FileEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @Column()
  name: string;

  @Column()
  filename_disk: string;

  @Column()
  filename: string;

  @ManyToOne(() => DocumentEntity, (entity) => entity.id)
  @JoinColumn({ name: 'document_id' })
  document: DocumentEntity;
}

export { FileEntity };
