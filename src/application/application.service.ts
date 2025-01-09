import { BadRequestException, Injectable } from '@nestjs/common';
import { ApplicationEntity, ApplicationStatus } from './application.entity';
import { ApplicationRepository } from './application.repository';
import { QueueRepository } from '../queue/queue.repository';
import { ParticipantRepository } from '../participant/participant.repository';
import { RealEstateRepository } from '../real_estate/real_estate.repository';
import { FamilyRepository } from '../family/family.repository';
import familyEntity from '../family/family.entity';
import { ParticipantService } from '../participant/participant.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApplicationEntityCreateDTO } from './dto/application.create';
import { ParticipantEntity } from '../participant/participant.entity';
import { ParentChildrenService } from '../parent_children/parent_children.service';

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
          spouse: {
            documents: true,
          },
          children: {
            child: {
              documents: true,
            },
          },
          family: {
            documents: true,
          },
        },
        documents: true,
        realEstate: true,
      },
    });

    return applications;
  }

  async getApplicationById(id: number): Promise<ApplicationEntity> {
    return await this.applicationRepository.findOne({
      where: {
        id,
      },
      relations: {
        queue: true,
        applicant: {
          spouse: {
            documents: { files: true },
          },
          children: {
            child: {
              documents: { files: true },
            },
          },
          family: {
            documents: { files: true },
          },
          documents: { files: true },
        },
        documents: { files: true },
        realEstate: true,
      },
    });
  }

  async setAcceptedStatus(id: number) {
    await this.applicationRepository.update(id, {
      status: ApplicationStatus.ACCEPTED,
    });
  }

  async updateApplication(
    application: ApplicationEntity,
  ): Promise<UpdateResult> {
    return await this.applicationRepository.update(application.id, application);
  }

  async deleteApplication(id: number): Promise<DeleteResult> {
    const application = await this.applicationRepository.delete(id);

    return application;
  }
}

export { ApplicationService };
