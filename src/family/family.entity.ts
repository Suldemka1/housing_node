import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentEntity } from '../document/document.entity';
import { ParticipantEntity } from '../participant/participant.entity';

@Entity({
  name: 'family',
})
class FamilyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'is_married',
    default: false,
  })
  isMarried: boolean;

  @Column({
    name: 'is_large',
    default: false,
  })
  isLarge: boolean;

  @OneToMany(() => DocumentEntity, (entity) => entity.family)
  documents: DocumentEntity[];

  @OneToMany(() => ParticipantEntity, (document) => document.family)
  participants: ParticipantEntity[];
}

export default FamilyEntity;
