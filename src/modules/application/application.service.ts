import { Injectable } from '@nestjs/common';
import { ApplicationEntity, ApplicationStatus } from './application.entity';
import { ApplicationRepository } from './application.repository';
import { QueueRepository } from '../queue/queue.repository';
import { RealEstateRepository } from '../real_estate/real_estate.repository';
import { ParticipantService } from '../participant/participant.service';
import { DeleteResult, JsonContains, UpdateResult } from 'typeorm';
import { ApplicationEntityCreateDTO } from './dto/application.create';
import { ApplicationViewEntity } from './views/applicant.view';
import { FamilyService } from '../family/family.service';

@Injectable()
class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly queueRepository: QueueRepository,
    private readonly participantService: ParticipantService,
    private readonly realEstateRepository: RealEstateRepository,
    private readonly familyService: FamilyService,
  ) {}

  async createDraftApplication(
    dto: ApplicationEntityCreateDTO,
  ): Promise<ApplicationEntity> {
    const applicationEntity = this.applicationRepository.create({
      ...dto.application,
      status: ApplicationStatus.DRAFT,
    });
    const application =
      await this.applicationRepository.save(applicationEntity);

    const family = await this.familyService.createFamily({
      isMarried: dto.spouse !== undefined,
      isLarge: dto.children?.length > 2,
      documents: dto.family.documents,
    });

    const queue = await this.queueRepository.createDraft();
    const realEstate = await this.realEstateRepository.createRealEstate({
      ...dto.real_estate,
    });

    const [applicant, spouse] =
      await this.participantService.createMarriedParticipants(
        [dto.applicant, dto.spouse],
        family.id,
      );

    await this.participantService.createChildren(
      dto.children,
      [applicant, spouse],
      family.id,
    );

    await this.applicationRepository.update(application.id, {
      status: ApplicationStatus.DRAFT,
      applicant: applicant,
      real_estate: realEstate,
    });

    await this.queueRepository.update(
      {
        id: queue.id,
      },
      {
        application: {
          id: application.id,
        },
      },
    );

    return application;
  }

  async getDraftApplications(): Promise<ApplicationViewEntity[]> {
    const applications = await this.applicationRepository.manager.find(
      ApplicationViewEntity,
      {
        where: {
          application: JsonContains({ status: ApplicationStatus.DRAFT }),
        },
      },
    );

    return applications;
  }

  async getApplicationById(id: number): Promise<ApplicationViewEntity> {
    const query = await this.applicationRepository.manager.findOne(
      ApplicationViewEntity,
      {
        where: {
          id,
        },
      },
    );
    return query;
  }

  async setAcceptedStatus(id: number) {
    await this.applicationRepository.update(id, {
      status: ApplicationStatus.ACCEPTED,
    });
  }

  updateApplication = async (
    application: ApplicationEntity,
  ): Promise<UpdateResult> => {
    return await this.applicationRepository.update(application.id, application);
  };

  async updatePartial() {}

  async deleteApplication(id: number): Promise<DeleteResult> {
    return await this.applicationRepository.delete(id);
  }
}

export { ApplicationService };
