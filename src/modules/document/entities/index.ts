import { ParticipantEntity } from '../../participant/participant.entity';
import FamilyEntity from '../../family/family.entity';
import { ApplicationEntity } from '../../application/application.entity';

export * from './divorce_certificate';
export * from './marriage_certificate';
export * from './birth_certificate';
export * from './birth_certificate';
export * from './passport.entity';
export * from './snils.entity';
export * from './document.entity';

type HasDocuments = {
  id: string | number;
  type: ParticipantEntity | FamilyEntity | ApplicationEntity;
};

export type { HasDocuments };
