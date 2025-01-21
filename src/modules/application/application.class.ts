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
    this.accepted_at = new Date(applicationFields.acceptedAt);
  }

  reason: string;
  accepted_at: Date;
  status: ApplicationStatus;

  private toApplicationEntity(): ApplicationEntity {
    const application = new ApplicationEntity();

    application.reason = this.reason;
    application.status = this.status;
    application.accepted_at = this.accepted_at;

    return application;
  }
}

export { Application };
