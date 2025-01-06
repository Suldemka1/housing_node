import { Injectable } from '@nestjs/common';
import { ApplicationEntity, ApplicationStatus } from './application.entity';
import { ApplicationRepository } from './application.repository';
import { QueueRepository } from '../queue/queue.repository';
import { ParticipantRepository } from '../participant/participant.repository';
import { RealEstateRepository } from '../real_estate/real_estate.repository';
import { FamilyRepository } from '../family/family.repository';
import familyEntity from '../family/family.entity';
import { ParticipantService } from '../participant/participant.service';

@Injectable()
class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly queueRepository: QueueRepository,
    private readonly participantService: ParticipantService,
    private readonly realEstateRepository: RealEstateRepository,
  ) {}

  async createDraftApplication(): Promise<ApplicationEntity> {
    const applicationEntity = this.applicationRepository.create({
      status: ApplicationStatus.DRAFT,
    });
    const draftQueue = await this.queueRepository.createDraft();
    const draftApplicant = await this.participantService.createDraft();
    const draftRealEstate = await this.realEstateRepository.createDraft();

    const application =
      await this.applicationRepository.save(applicationEntity);

    await this.applicationRepository.update(application.id, {
      queue: draftQueue,
      applicant: draftApplicant,
      realEstate: draftRealEstate,
    });

    return application;
  }

  async getDraftApplications(): Promise<ApplicationEntity[]> {
    const applications = await this.applicationRepository.find({
      where: {
        status: ApplicationStatus.DRAFT,
      },
      relations: {
        queue: true,
        applicant: {
          spouse: true,
          children: true,
          family: true,
          passport: true,
        },
        realEstate: true,
      },
    });

    return applications;
  }

  async setAcceptedStatus(id: number) {
    await this.applicationRepository.update(id, {
      status: ApplicationStatus.ACCEPTED,
    });
  }

  async deleteApplication(id: number) {
    const application = await this.applicationRepository.delete(id);

    return application;
  }
}

export { ApplicationService };
