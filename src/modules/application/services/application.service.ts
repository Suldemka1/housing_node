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
import * as dayjs from 'dayjs';
import { DocumentTypes } from '../../document/entities';

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

  async getBaseApplicationInTableView(): Promise<
    {
      id: number;
      queue_number: number;
      queue_type: string;
      full_name: string;
      passport_details: string;
      age: number;
      accepted_at: string;
      support_amount: number;
    }[]
  > {
    const baseQueueApplications = await this.applicationRepository.find({
      where: {
        applicant: {
          documents: {
            type: DocumentTypes.PASSPORT,
          },
        },
      },
      relations: {
        queue: true,
        applicant: {
          documents: {
            passport: true,
          },
        },
        real_estate: true,
      },
    });

    const today = dayjs();

    return baseQueueApplications.map((application) => {
      const passport = application.applicant.documents.find(
        (doc) => doc.type == 'PASSPORT',
      )?.passport;

      const birthday = dayjs(passport.birthdate);

      return {
        id: application.id,
        queue_number: application.queue?.number ?? 0,
        queue_type: application.queue?.type ?? 'base',
        full_name:
          application.applicant.surname +
          ' ' +
          application.applicant.name +
          ' ' +
          application.applicant.patronymic,
        age: today.diff(birthday, 'years'),
        passport_details: passport.series + ' ' + passport.number,
        accepted_at: application.accepted_at.toString(),
        support_amount: application.real_estate?.support_amount ?? 0,
      };
    });
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
