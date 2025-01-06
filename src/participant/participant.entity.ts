import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentEntity } from '../document/document.entity';
import FamilyEntity from '../family/family.entity';
import { ApplicationEntity } from '../application/application.entity';
import { AccountEntity } from '../account/account.entity';
import { ParentChildrenEntity } from '../parent_children/parent_children.entity';

@Entity({
  name: 'participant',
})
class ParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => FamilyEntity, (entity) => entity.id)
  @JoinColumn({ name: 'family_id' })
  family: FamilyEntity;

  @OneToOne(() => DocumentEntity, (document) => document.id)
  @JoinColumn({ name: 'passport_id' })
  passport: DocumentEntity;

  @OneToMany(() => DocumentEntity, (entity) => entity.id)
  documents: DocumentEntity[];

  @OneToMany(() => ParentChildrenEntity, (entity) => entity.parent)
  children?: ParticipantEntity[];

  @OneToMany(() => ParentChildrenEntity, (entity) => entity.child)
  parents?: ParticipantEntity[];

  @OneToOne(() => ParticipantEntity, (entity) => entity.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'spouse_id' })
  spouse?: ParticipantEntity;

  @OneToOne(() => ApplicationEntity, (entity) => entity.id)
  @JoinColumn({ name: 'application_id' })
  application: ApplicationEntity;

  @OneToOne(() => AccountEntity, (entity) => entity.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'account_id' })
  account?: AccountEntity;
}

export { ParticipantEntity };
