import { Injectable } from '@nestjs/common';
import { ApplicationEntity } from '../application.entity';
import { ApplicationRepository } from '../application.repository';
import { QueueRepository } from '../../queue/queue.repository';
import { RealEstateRepository } from '../../real_estate/real_estate.repository';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApplicationEntityCreateDTO } from '../dto/application.create';
import { ApplicationViewEntity } from '../views/applicantion.view';
import { FamilyService } from '../../family/family.service';
import { UpdateApplicationDTO } from '../dto/application.update';

@Injectable()
class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly queueRepository: QueueRepository,
    private readonly realEstateRepository: RealEstateRepository,
    private readonly familyService: FamilyService,
  ) {}

  async create() {}

  async createDraftApplication(
    dto: ApplicationEntityCreateDTO,
  ): Promise<ApplicationEntity> {
    const { applicant } = await this.familyService.createFamily(dto);
    dto.applicant.id = applicant.id;

    const application = await this.applicationRepository.createApplication(dto);
    const { id } = application;
    const { real_estate } = dto;
    const { queue_number } = dto.application;

    await this.queueRepository.createDraft(id, queue_number);
    await this.realEstateRepository.createRealEstate(id, real_estate);

    return application;
  }

  async getDraftApplications(): Promise<ApplicationViewEntity[]> {
    return await this.applicationRepository.getAllDraftApplications();
  }

  async getApplicationById(id: number): Promise<ApplicationViewEntity> {
    return await this.applicationRepository.getApplicationById(id);
  }

  async updateApplication(
    application: UpdateApplicationDTO,
  ): Promise<UpdateResult> {
    return await this.applicationRepository.update(application.id, application);
  }

  async deleteApplication(id: number): Promise<DeleteResult> {
    return await this.applicationRepository.delete(id);
  }
}

export { ApplicationService };
