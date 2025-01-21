import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentEntity } from '../document/entities/document.entity';
import { ParticipantEntity } from '../participant/participant.entity';

@Entity({
  name: 'family',
})
class FamilyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false,
    name: 'is_married',
  })
  isMarried: boolean;

  @Column({
    default: false,
    name: 'is_large',
  })
  isLarge: boolean;

  @OneToMany(() => DocumentEntity, (entity) => entity.family)
  documents: DocumentEntity[];

  @OneToMany(() => ParticipantEntity, (document) => document.family)
  participants: ParticipantEntity[];
}

export default FamilyEntity;
