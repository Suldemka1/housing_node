import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParticipantEntity } from '../participant/participant.entity';

@Entity({
  name: 'account',
})
class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  phone: string;

  @OneToOne(() => ParticipantEntity, (entity) => entity.account, {
    nullable: true,
  })
  user: ParticipantEntity;
}

export { AccountEntity };
