import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { DocumentEntity } from './document.entity';

@Entity('marriage_certificates')
class MarriageCertificateEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  series: string;

  @Column()
  number: string;

  @Column()
  issuer: string;

  @Column('date')
  issued_date: Date;

  @OneToOne(() => DocumentEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'document_id' })
  document: DocumentEntity;
}

export { MarriageCertificateEntity };
