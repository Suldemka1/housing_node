import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentEntity } from '../document/entities/document.entity';
import { ApplicationEntity } from '../application/application.entity';

@Entity({
  name: 'real_estate',
})
class RealEstateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
  })
  area: number;

  @Column({
    default: 0,
  })
  sqm_price: number;

  @Column({
    default: 0,
  })
  full_price: number;

  @Column({
    default: 0,
  })
  support_amount: number;

  @OneToMany(() => DocumentEntity, (document) => document.id)
  documents: DocumentEntity[];

  @OneToOne(() => ApplicationEntity, (entity) => entity.id)
  application: ApplicationEntity;
}

export { RealEstateEntity };
