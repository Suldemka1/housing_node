import { Injectable, NotImplementedException } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import {
  BirthCertificateEntity,
  DivorceCertificateEntity,
  DocumentEntity,
  DocumentTypes,
  MarriageCertificateEntity,
  PassportEntity,
} from '../entities';
import {
  BirthCertificateCreateDTO,
  DivorceCertificateCreateDTO,
  MarriageCertificateCreateDTO,
  PassportCreateDTO,
} from '../crud_strategies/create_strategy/dto';
import {
  BirthCertificateUpdateDTO,
  DivorceCertificateUpdateDTO,
  MarriageCertificateUpdateDTO,
  PassportUpdateDTO,
} from '../crud_strategies/update_strategy/dto';

@Injectable()
class DocumentRepository extends Repository<DocumentEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(DocumentEntity, dataSource.createEntityManager());
  }

  async createPassport(dto: PassportCreateDTO) {
    const transaction = await this.dataSource.manager.transaction(
      async (manager) => {
        const document = manager.create(DocumentEntity, {
          type: DocumentTypes.PASSPORT,
        });
        const savedDocument = await manager.save(DocumentEntity, document);
        const passport = manager.create(PassportEntity, {
          id: savedDocument.id,
          series: dto.series,
          number: dto.number,
          unit_code: dto.unit_code,
          issuer: dto.issuer,
          issued_date: dto.issued_date,
          birthdate: dto.birthdate,
          document: {
            id: savedDocument.id,
          },
        });
        await manager.save(PassportEntity, passport);

        return await manager.findOne(DocumentEntity, {
          where: { id: savedDocument.id },
          relations: {
            passport: true,
          },
        });
      },
    );

    return transaction;
  }

  async createBirthCertificate(dto: BirthCertificateCreateDTO) {
    const transaction = await this.dataSource.manager.transaction(
      async (manager) => {
        const document = manager.create(DocumentEntity, {
          type: DocumentTypes.BIRTH_CERTIFICATE,
        });
        const savedDocument = await manager.save(DocumentEntity, document);
        const birthCertificate = manager.create(BirthCertificateEntity, {
          id: savedDocument.id,
          series: dto.series,
          number: dto.number,
          unit_code: dto.unit_code,
          issuer: dto.issuer,
          issued_date: dto.issued_date,
          birthdate: dto.birthdate,
          document: {
            id: savedDocument.id,
          },
        });
        await manager.save(BirthCertificateEntity, birthCertificate);

        return await manager.findOne(DocumentEntity, {
          where: { id: savedDocument.id },
          relations: {
            birth_certificate: true,
          },
        });
      },
    );

    return transaction;
  }

  async createMarriageCertificate(dto: MarriageCertificateCreateDTO) {
    const transaction = await this.dataSource.manager.transaction(
      async (manager) => {
        const document = manager.create(DocumentEntity, {
          type: DocumentTypes.MARRIAGE_CERTIFICATE,
        });
        const savedDocument = await manager.save(DocumentEntity, document);
        const marriageCertificate = manager.create(MarriageCertificateEntity, {
          ...dto,
          id: savedDocument.id,
          document: {
            id: savedDocument.id,
          },
        });
        await manager.save(MarriageCertificateEntity, marriageCertificate);

        return await manager.findOne(DocumentEntity, {
          where: { id: savedDocument.id },
          relations: {
            marriage_certificate: true,
          },
        });
      },
    );

    return transaction;
  }

  async createDivorceCertificate(dto: DivorceCertificateCreateDTO) {
    const transaction = await this.dataSource.manager.transaction(
      async (manager) => {
        const document = manager.create(DocumentEntity, {
          type: DocumentTypes.DIVORCE_CERTIFICATE,
        });
        const savedDocument = await manager.save(DocumentEntity, document);
        const passport = manager.create(DivorceCertificateEntity, {
          ...dto,
          id: savedDocument.id,
          document: {
            id: savedDocument.id,
          },
        });
        await manager.save(DivorceCertificateEntity, passport);

        return await manager.findOne(DocumentEntity, {
          where: { id: savedDocument.id },
          relations: {
            divorce_certificate: true,
          },
        });
      },
    );

    return transaction;
  }

  async updatePassport(entity: PassportUpdateDTO): Promise<DocumentEntity> {
    const { type, ...passportFields } = entity;
    const data = await this.manager.update(
      PassportEntity,
      { id: entity.id },
      passportFields,
    );

    const passport = await this.findOne({
      where: { id: entity.id },
      relations: {
        passport: true,
      },
    });

    return passport;
  }

  async updateBirthCertificate(
    entity: BirthCertificateUpdateDTO,
  ): Promise<DocumentEntity> {
    // TODO: implement update method
    throw new NotImplementedException();
    return await this.findOne({
      where: { id: entity.id },
      relations: {
        birth_certificate: true,
      },
    });
  }

  async updateMarriageCertificate(
    entity: MarriageCertificateUpdateDTO,
  ): Promise<DocumentEntity> {
    // TODO: implement update method
    throw new NotImplementedException();
    return await this.findOne({
      where: { id: entity.id },
      relations: {
        marriage_certificate: true,
      },
    });
  }

  async updateDivorceCertificate(
    entity: DivorceCertificateUpdateDTO,
  ): Promise<DocumentEntity> {
    // TODO: implement update method
    throw new NotImplementedException();
    return await this.findOne({
      where: { id: entity.id },
      relations: {
        divorce_certificate: true,
      },
    });
  }
}

export { DocumentRepository };
