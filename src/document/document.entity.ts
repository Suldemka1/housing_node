import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from '../files/files.entity';
import { ParticipantEntity } from '../participant/participant.entity';
import { ApplicationEntity } from '../application/application.entity';

enum DocumentType {
  UNDEFINED = 'UNDEFINED',
  PASSPORT = 'PASSPORT',
  CERTIFICATE = 'CERTIFICATE',
  MARRIAGE_CERTIFICATE = 'MARRIAGE_CERTIFICATE',
  SNILS = 'SNILS',
  INN = 'INN',
}

@Entity({
  name: 'document',
})
class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: DocumentType, default: DocumentType.UNDEFINED })
  type: DocumentType;

  @Column({
    nullable: true,
    default: null,
  })
  series?: string;

  @Column({
    nullable: true,
    default: null,
  })
  number?: string;

  @Column({
    default: null,
  })
  unit_code?: string;

  @Column({ type: 'date', nullable: true })
  issued_date?: string;

  @Column({
    nullable: true,
  })
  issuer?: string;

  @OneToMany(() => FileEntity, (entity) => entity.id)
  file?: FileEntity[];

  @ManyToOne(() => ParticipantEntity, (entity) => entity.id)
  participants: ParticipantEntity;

  @ManyToOne(() => ApplicationEntity, (entity) => entity.id)
  application: ApplicationEntity;
}

export { DocumentEntity, DocumentType };
