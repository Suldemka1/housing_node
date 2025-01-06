import { Module } from '@nestjs/common';
import { RealEstateRepository } from './real_estate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstateEntity } from './real_estate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RealEstateEntity])],
  providers: [RealEstateRepository],
  exports: [RealEstateRepository],
})
class RealEstateModule {}

export { RealEstateModule };
