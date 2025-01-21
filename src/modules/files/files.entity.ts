import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DocumentEntity } from '../document/entities/document.entity';

@Entity({
  name: 'files',
})
class FileEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @Column({ name: 'filename_disk' })
  filenameDisk: string;

  @Column()
  filename: string;

  @ManyToOne(() => DocumentEntity, (entity) => entity.id)
  @JoinColumn({ name: 'document_id' })
  document: DocumentEntity;
}

export { FileEntity };
