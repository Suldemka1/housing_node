import { ApplicationEntity, ApplicationStatus } from './application.entity';

type ApplicationFields = {
  reason: string;
  acceptedAt: string;
  status: ApplicationStatus;
};

class Application {
  constructor(applicationFields: ApplicationFields) {
    this.reason = applicationFields.reason;
    this.status = applicationFields.status;
    this.acceptedAt = new Date(applicationFields.acceptedAt);
  }

  reason: string;
  acceptedAt: Date;
  status: ApplicationStatus;

  private toApplicationEntity(): ApplicationEntity {
    const application = new ApplicationEntity();

    application.reason = this.reason;
    application.status = this.status;
    application.acceptedAt = this.acceptedAt;

    return application;
  }
}

export { Application };
