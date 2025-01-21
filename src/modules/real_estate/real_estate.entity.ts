import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentEntity } from '../document/entities/document.entity';

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
}

export { RealEstateEntity };
