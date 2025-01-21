import { RealEstateRepository } from './real_estate.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
class RealEstateService {
  constructor(private readonly realEstateRepository: RealEstateRepository) {}
}

export { RealEstateService };
