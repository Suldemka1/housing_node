import { ApplicationEntity } from '../application.entity';
import { QueueType } from '../../queue/queue.entity';

type ValidationError = {
  key: string;
  message: string;
};

class ApplicationValidator {
  static validate(
    application: ApplicationEntity,
  ): Array<ValidationError> | true {
    let isValid = true;
    const errors: Array<ValidationError> = [];
    if (application.reason === null) {
      isValid = false;
      errors.push({ key: 'reason', message: 'Не может быть пустым' });
    }

    if (application.queue.number === 0) {
    }

    if (application.realEstate.realEstatePrice === 0) {
    }

    if (isValid) {
      return true;
    } else {
      return errors;
    }
  }
}

export { ApplicationValidator };
