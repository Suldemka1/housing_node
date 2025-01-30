import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { DocumentEntity } from './document.entity';

@Entity('divorce_certificates')
class DivorceCertificateEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('date')
  issued_date: Date;

  @OneToOne(() => DocumentEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'document_id' })
  document: DocumentEntity;
}

export { DivorceCertificateEntity };
