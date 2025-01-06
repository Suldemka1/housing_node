import { ParticipantEntity } from '../participant/participant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QueueEntity } from '../queue/queue.entity';
import { RealEstateEntity } from '../real_estate/real_estate.entity';

enum ApplicationStatus {
  DRAFT = 'DRAFT',
  ACCEPTED = 'ACCEPTED',
  COMPLETED = 'COMPLETED',
}

@Entity({
  name: 'application',
})
class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 'Приказ',
  })
  reason: string;

  @Column({
    enum: ApplicationStatus,
    default: ApplicationStatus.DRAFT,
  })
  status: ApplicationStatus;

  @OneToOne(() => QueueEntity, (queue) => queue.application)
  @JoinColumn({ name: 'queue_id' })
  queue: QueueEntity;

  @OneToOne(() => ParticipantEntity, (entity) => entity.id)
  @JoinColumn({ name: 'applicant_id' })
  applicant: ParticipantEntity;

  @OneToOne(() => RealEstateEntity, (entity) => entity.id)
  @JoinColumn({ name: 'real_estate_id' })
  realEstate: RealEstateEntity;

  @Column({
    type: 'date',
    name: 'accepted_at',
    default: new Date(),
  })
  acceptedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}

export { ApplicationEntity, ApplicationStatus };
