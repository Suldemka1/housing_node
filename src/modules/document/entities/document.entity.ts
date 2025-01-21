import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileEntity } from '../../files/files.entity';
import { ParticipantEntity } from '../../participant/participant.entity';
import { ApplicationEntity } from '../../application/application.entity';
import FamilyEntity from '../../family/family.entity';
import { PassportEntity } from './passport.entity';
import { DivorceCertificateEntity } from './divorce_certificate';
import { MarriageCertificateEntity } from './marriage_certificate';

enum DocumentTypes {
  UNDEFINED = 'UNDEFINED',
  PASSPORT = 'PASSPORT',
  BIRTH_CERTIFICATE = 'BIRTH_CERTIFICATE',
  MARRIAGE_CERTIFICATE = 'MARRIAGE_CERTIFICATE',
  DIVORCE_CERTIFICATE = 'DIVORCE_CERTIFICATE',
  SNILS = 'SNILS',
  INN = 'INN',
}

@Entity({
  name: 'documents',
})
class DocumentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: DocumentTypes, default: DocumentTypes.UNDEFINED })
  type: DocumentTypes;

  @OneToMany(() => FileEntity, (entity) => entity.document)
  files?: FileEntity[];

  @ManyToOne(() => ParticipantEntity, (entity) => entity.id)
  @JoinColumn({ name: 'participant_id' })
  participant: ParticipantEntity;

  @ManyToOne(() => FamilyEntity, (entity) => entity.id)
  @JoinColumn({ name: 'family_id' })
  family: FamilyEntity;

  @ManyToOne(() => ApplicationEntity, (entity) => entity.id)
  @JoinColumn({ name: 'application_id' })
  application: ApplicationEntity;

  // document types
  @OneToOne(() => PassportEntity, (entity) => entity.document, {
    nullable: true,
  })
  passport: PassportEntity;

  @OneToOne(() => PassportEntity, (entity) => entity.document, {
    nullable: true,
  })
  birth_certificate?: PassportEntity;

  @OneToOne(() => MarriageCertificateEntity, (entity) => entity.document, {
    nullable: true,
  })
  marriage_certificate?: MarriageCertificateEntity;

  @OneToOne(() => DivorceCertificateEntity, (entity) => entity.document, {
    nullable: true,
  })
  divorce_certificate?: DivorceCertificateEntity;
}

export { DocumentEntity, DocumentTypes };
