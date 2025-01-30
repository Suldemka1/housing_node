import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParticipantEntity } from '../participant/participant.entity';

@Entity('parent_children')
class ParentChildrenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParticipantEntity, (participant) => participant.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: ParticipantEntity;

  @ManyToOne(() => ParticipantEntity, (participant) => participant.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'children_id' })
  child: ParticipantEntity;
}

export { ParentChildrenEntity };
