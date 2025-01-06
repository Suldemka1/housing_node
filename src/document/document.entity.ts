import {
  AfterLoad,
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
    type: 'date',
    nullable: true,
    default: null,
  })
  birthdate?: Date;

  @Column({
    name: 'unit_code',
    default: null,
  })
  unitCode?: string;

  @Column({ type: 'date', nullable: true, name: 'issued_date' })
  issuedDate?: Date;

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

  @AfterLoad()
  convertToDocumentType() {
    if (this.type === DocumentType.PASSPORT) {
    }

    if (this.type === DocumentType.CERTIFICATE) {
    }

    if (this.type === DocumentType.MARRIAGE_CERTIFICATE) {
      delete this.unitCode;
      delete this.birthdate;
    }

    if (this.type === DocumentType.UNDEFINED) {
      delete this.birthdate;
      delete this.unitCode;
      delete this.issuer;
      delete this.issuedDate;
    }
  }
}

export { DocumentEntity, DocumentType };
