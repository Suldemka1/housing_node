import { DocumentEntity, DocumentTypes } from '../../entities';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { AnyDocumentUpdateDTO, DocumentUpdateDTO } from './dto';
import { MarriageCertificateUpdateBehavior } from './behaviors/marriage_certificate.behavior';
import { PassportUpdateBehavior } from './behaviors/passport.behavior';
import { BirthCertificateUpdateBehavior } from './behaviors/birth_certificate.behavior';
import { DivorceCertificateUpdateBehavior } from './behaviors/divorce_certificate.behavior';

interface DocumentUpdater {
  update(dto: AnyDocumentUpdateDTO): Promise<DocumentEntity>;
}

@Injectable()
class DocumentUpdateStrategy implements DocumentUpdater {
  constructor(
    private readonly passportUpdateBehavior: PassportUpdateBehavior,
    private readonly birthCertificateUpdateBehavior: BirthCertificateUpdateBehavior,
    private readonly divorceCertificateUpdateBehavior: DivorceCertificateUpdateBehavior,
    private readonly marriageCertificateUpdateBehavior: MarriageCertificateUpdateBehavior,
  ) {}

  private strategy: DocumentUpdater;

  private setStrategy(behavior: DocumentUpdater) {
    this.strategy = behavior;
  }

  async update(dto: DocumentUpdateDTO): Promise<DocumentEntity> {
    const { type } = dto;
    if (type === DocumentTypes.PASSPORT) {
      this.setStrategy(this.passportUpdateBehavior);
    }

    if (type === DocumentTypes.BIRTH_CERTIFICATE) {
      this.setStrategy(this.birthCertificateUpdateBehavior);
    }

    if (type === DocumentTypes.DIVORCE_CERTIFICATE) {
      this.setStrategy(this.divorceCertificateUpdateBehavior);
    }

    if (type === DocumentTypes.MARRIAGE_CERTIFICATE) {
      this.setStrategy(this.marriageCertificateUpdateBehavior);
    }

    if (type === DocumentTypes.SNILS) {
      // TODO: need to implement SNILS-document creation behavior
      throw new NotImplementedException('snils update is not implemented.');
    }
    const document = await this.strategy.update(dto);
    return document;
  }
}

export { DocumentUpdater, DocumentUpdateStrategy };
