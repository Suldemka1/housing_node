import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationEntity } from '../application/application.entity';

enum QueueType {
  DRAFT = 'DRAFT',
  LARGE = 'LARGE',
  BASE = 'BASE',
}

@Entity('queue')
@Index('type_number', ['type', 'number'], { unique: true })
class QueueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: QueueType, default: QueueType.DRAFT })
  type: QueueType;

  @Column({
    default: null,
    nullable: true,
  })
  number?: number;

  @OneToOne(() => ApplicationEntity, (entity) => entity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'application_id' })
  application: ApplicationEntity;
}

export { QueueEntity, QueueType };
