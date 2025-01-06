import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentEntity } from '../document/document.entity';

@Entity({
  name: 'real_estate',
})
class RealEstateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'pricePerMeter',
    default: 0,
  })
  pricePerMeter: number;

  @Column({
    default: 0,
  })
  area: number;

  @Column({
    name: 'realEstatePrice',
    default: 0,
  })
  realEstatePrice: number;

  @Column({
    name: 'supportAmount',
    default: 0,
  })
  supportAmount: number;

  @OneToMany(() => DocumentEntity, (document) => document.id)
  documents: DocumentEntity[];
}

export { RealEstateEntity };
