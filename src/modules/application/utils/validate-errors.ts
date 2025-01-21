enum ValidateErrorType {
  QueueNumberLessThanOne = 'QueueNumberLessThanOne',
  ReasonIsNull = 'ReasonIsNull',
}

function getErrorMessage(errorType: ValidateErrorType): string {
  switch (errorType) {
    case ValidateErrorType.QueueNumberLessThanOne:
      return '';
    case ValidateErrorType.ReasonIsNull:
      return '';
    default:
      return 'unexpected error type';
  }
}

export { ValidateErrorType, getErrorMessage };
