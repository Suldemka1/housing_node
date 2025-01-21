import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { DocumentEntity } from './document.entity';

@Entity('divorce_certificates')
class DivorceCertificateEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => DocumentEntity, (entity) => entity.id)
  @JoinColumn({ name: 'document_id' })
  document: DocumentEntity;
}

export { DivorceCertificateEntity };
