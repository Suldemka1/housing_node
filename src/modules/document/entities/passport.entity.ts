import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { DocumentEntity } from './document.entity';

@Entity({
  name: 'passports',
})
class PassportEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    default: null,
  })
  series: string;

  @Column({
    default: null,
  })
  number: string;

  @Column({
    default: null,
  })
  unit_code?: string;

  @Column({ type: 'date' })
  issued_date: Date;

  @Column()
  issuer: string;

  @Column({
    type: 'date',
    default: null,
  })
  birthdate: Date;

  @OneToOne(() => DocumentEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'document_id' })
  document: DocumentEntity;
}

export { PassportEntity };
