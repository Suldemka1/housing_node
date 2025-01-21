import { ApplicationEntity } from '../application.entity';

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

    if (application.real_estate.full_price === 0) {
    }

    if (isValid) {
      return true;
    } else {
      return errors;
    }
  }
}

export { ApplicationValidator };
