import { DocumentEntity, DocumentTypes } from '../../entities';
import { AnyDocumentCreateDTO } from './dto';
import { PassportCreationBehavior } from './behaviors/passport.behavior';
import { BirthCertificateCreationBehavior } from './behaviors/birth_certificate.behavior';
import { DivorceCertificateCreationBehavior } from './behaviors/divorce_certificate.behavior';
import { MarriageCertificateCreationBehavior } from './behaviors/marriage_certificate.behavior';
import { Injectable, NotImplementedException } from '@nestjs/common';

interface DocumentCreator {
  create(dto: AnyDocumentCreateDTO): Promise<DocumentEntity>;
}

@Injectable()
class DocumentCreateStrategy implements DocumentCreator {
  constructor(
    private readonly passportCreationBehavior: PassportCreationBehavior,
    private readonly birthCertificateCreationBehavior: BirthCertificateCreationBehavior,
    private readonly marriageCertificateCreationBehavior: MarriageCertificateCreationBehavior,
    private readonly divorceCertificateCreationBehavior: DivorceCertificateCreationBehavior,
  ) {}

  private strategy: DocumentCreator;

  private setStrategy(behavior: DocumentCreator) {
    this.strategy = behavior;
  }

  async create(dto: AnyDocumentCreateDTO): Promise<DocumentEntity> {
    const { type } = dto;
    if (type === DocumentTypes.PASSPORT) {
      this.setStrategy(this.passportCreationBehavior);
    }

    if (type === DocumentTypes.BIRTH_CERTIFICATE) {
      this.setStrategy(this.birthCertificateCreationBehavior);
    }

    if (type === DocumentTypes.DIVORCE_CERTIFICATE) {
      this.setStrategy(this.divorceCertificateCreationBehavior);
    }

    if (type === DocumentTypes.MARRIAGE_CERTIFICATE) {
      this.setStrategy(this.marriageCertificateCreationBehavior);
    }

    if (type === DocumentTypes.SNILS) {
      // TODO: need to implement SNILS-document creation behavior
      throw new NotImplementedException();
    }
    const document = await this.strategy.create(dto);
    console.group(`Document created: ${type}`);
    console.log(document);
    console.groupEnd();
    return document;
  }
}

export { DocumentCreator, DocumentCreateStrategy };
