import { Injectable } from '@nestjs/common';
import FamilyEntity from '../../family/family.entity';
import { FamilyService } from '../../family/family.service';
import { ApplicationEntityCreateDTO } from '../dto/application.create';
import { ParticipantEntity } from '../../participant/participant.entity';
import { ApplicationEntity } from '../application.entity';
import { ApplicationService } from './application.service';
import { QueueService } from '../../queue/queue.service';

@Injectable()
class ApplicationRegisterService {
  constructor(
    private familyService: FamilyService,
    private applicationService: ApplicationService,
    private queueService: QueueService,
  ) {}

  body: ApplicationEntityCreateDTO;
  application: ApplicationEntity;
  family: FamilyEntity;
  applicant: ParticipantEntity;

  async register(dto: ApplicationEntityCreateDTO) {
    this.body = dto;

    await this.createFamily();
    await this.createApplication();
    await this.createQueue();
  }

  async createApplication() {
    const {} = this.applicationService.createDraftApplication(this.body);
  }

  async createFamily() {
    const { family, applicant } = await this.familyService.createFamily(
      this.body,
    );

    this.family = family;
    this.applicant = applicant;
  }

  async createQueue() {
    this.queueService;
  }

  async createRealEstate() {}
}

export { ApplicationRegisterService };
