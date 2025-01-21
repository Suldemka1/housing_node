import { BadRequestException, Injectable } from '@nestjs/common';
import { ApplicationEntity, ApplicationStatus } from './application.entity';
import { ApplicationRepository } from './application.repository';
import { QueueRepository } from '../queue/queue.repository';
import { RealEstateRepository } from '../real_estate/real_estate.repository';
import { FamilyRepository } from '../family/family.repository';
import { ParticipantService } from '../participant/participant.service';
import { DeleteResult, JsonContains, UpdateResult } from 'typeorm';
import { ApplicationEntityCreateDTO } from './dto/application.create';
import { ParentChildrenService } from '../parent_children/parent_children.service';
import { ApplicationViewEntity } from './views/applicant.view';

@Injectable()
class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly queueRepository: QueueRepository,
    private readonly participantService: ParticipantService,
    private readonly realEstateRepository: RealEstateRepository,
    private readonly familyRepository: FamilyRepository,
    private readonly parentChildrenService: ParentChildrenService,
  ) {}

  async createDraftApplication(
    dto: ApplicationEntityCreateDTO,
  ): Promise<ApplicationEntity> {
    const applicationEntity = this.applicationRepository.create({
      status: ApplicationStatus.DRAFT,
    });

    const draftQueue = await this.queueRepository.createDraft();

    const family = this.familyRepository.create({
      isMarried: dto.spouse !== undefined,
      isLarge: dto.children?.length > 2,
    });

    const savedFamily = await this.familyRepository.save(family);

    const spouse = await this.participantService.create({
      surname: dto.spouse.surname,
      name: dto.spouse.name,
      patronymic: dto.spouse.patronymic,
      familyId: savedFamily.id,
      documents: dto.spouse.documents,
    });
    const draftApplicant = await this.participantService.create({
      ...dto.applicant,
      familyId: family.id,
      spouseId: spouse?.id,
      documents: dto.applicant.documents,
    });
    try {
      for (const child of dto.children) {
        const childObject = await this.participantService.create({
          surname: child.surname,
          name: child.name,
          patronymic: child.patronymic,
          familyId: savedFamily.id,
          documents: child.documents,
        });
        await this.parentChildrenService.appendChildren(
          [spouse.id, draftApplicant.id],
          [childObject.id],
        );
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }

    const draftRealEstate = await this.realEstateRepository.createDraft();

    const application =
      await this.applicationRepository.save(applicationEntity);

    await this.applicationRepository.update(application.id, {
      status: undefined,
      queue: draftQueue,
      applicant: draftApplicant,
      real_estate: draftRealEstate,
    });

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

  async deleteApplication(id: number): Promise<DeleteResult> {
    return await this.applicationRepository.delete(id);
  }
}

export { ApplicationService };
