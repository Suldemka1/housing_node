import { Injectable } from '@nestjs/common';

enum ParticipantType {
  APPLICANT = 'APPLICANT',
  SPOUSE = 'SPOUSE',
  CHILDREN = 'CHILDREN',
}

@Injectable()
class ParticipantFactory {
  createParticipant(type: ParticipantType) {
    switch (type) {
      case ParticipantType.APPLICANT:
        break;
      case ParticipantType.SPOUSE:
        break;
      case ParticipantType.CHILDREN:
        break;
      default:
        break;
    }
  }
}

export { ParticipantFactory, ParticipantType };
