import { Injectable } from '@nestjs/common';
import { ApplicationEntity, ApplicationStatus } from './application.entity';
import { DataSource, JsonContains, Repository } from 'typeorm';
import { ApplicationEntityCreateDTO } from './dto/application.create';
import { ApplicationViewEntity } from './views/applicantion.view';

@Injectable()
class ApplicationRepository extends Repository<ApplicationEntity> {
  constructor(dataSource: DataSource) {
    super(ApplicationEntity, dataSource.createEntityManager());
  }

  async createApplication(
    dto: ApplicationEntityCreateDTO,
  ): Promise<ApplicationEntity> {
    const { application } = dto;
    const createdApplication = this.create({
      ...application,
      status: ApplicationStatus.DRAFT,
      applicant: {
        id: dto.applicant.id,
      },
    });
    return await this.save(createdApplication);
  }

  async getAllDraftApplications(): Promise<ApplicationViewEntity[]> {
    return await this.manager.find(ApplicationViewEntity, {
      where: {
        application: JsonContains({ status: ApplicationStatus.DRAFT }),
      },
    });
  }

  async getApplicationById(id: number): Promise<ApplicationViewEntity> {
    return await this.manager.findOne(ApplicationViewEntity, {
      where: {
        id,
      },
    });
  }
}

export { ApplicationRepository };
