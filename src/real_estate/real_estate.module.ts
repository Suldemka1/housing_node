import { Module } from '@nestjs/common';
import { RealEstateRepository } from './real_estate.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstateEntity } from './real_estate.entity';
import { RealEstateService } from './real_estate.service';

@Module({
  imports: [TypeOrmModule.forFeature([RealEstateEntity])],
  providers: [RealEstateService, RealEstateRepository],
  exports: [RealEstateService, RealEstateRepository],
})
class RealEstateModule {}

export { RealEstateModule };
