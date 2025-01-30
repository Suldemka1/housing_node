import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentEntity } from '../document/entities/document.entity';
import FamilyEntity from '../family/family.entity';
import { ApplicationEntity } from '../application/application.entity';
import { AccountEntity } from '../account/account.entity';
import { ParentChildrenEntity } from '../parent_children/parent_children.entity';

@Entity({
  name: 'participant',
})
class ParticipantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'Фамилия',
  })
  surname: string;

  @Column({
    default: 'Имя',
  })
  name: string;

  @Column({
    default: 'Отчество',
  })
  patronymic: string;

  @ManyToOne(() => FamilyEntity, (entity) => entity.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'family_id' })
  family: FamilyEntity;

  @OneToOne(() => DocumentEntity, (document) => document.id)
  @JoinColumn({ name: 'document_id' })
  passport: DocumentEntity;

  @OneToMany(() => DocumentEntity, (entity) => entity.participant)
  documents: DocumentEntity[];

  @OneToMany(() => ParentChildrenEntity, (entity) => entity.parent)
  children?: ParentChildrenEntity[];

  @OneToMany(() => ParentChildrenEntity, (entity) => entity.child)
  parents?: ParentChildrenEntity[];

  @OneToOne(() => ParticipantEntity, (entity) => entity.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'spouse_id' })
  spouse?: ParticipantEntity;

  @OneToOne(() => ApplicationEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
  })
  application: ApplicationEntity;

  @OneToOne(() => AccountEntity, (entity) => entity.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'account_id' })
  account?: AccountEntity;
}

export { ParticipantEntity };
