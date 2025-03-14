import configuration from './config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { DocumentModule } from './modules/document/document.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueEntity } from './modules/queue/queue.entity';
import { ApplicationEntity } from './modules/application/application.entity';
import FamilyEntity from './modules/family/family.entity';
import { ParticipantEntity } from './modules/participant/participant.entity';
import { DocumentEntity } from './modules/document/entities/document.entity';
import { AccountEntity } from './modules/account/account.entity';
import { RealEstateEntity } from './modules/real_estate/real_estate.entity';
import { FileEntity } from './modules/files/files.entity';
import { ParentChildrenEntity } from './modules/parent_children/parent_children.entity';
import { RoleEntity } from './modules/role/role.entity';
import { RoleModule } from './modules/role/role.module';
import { ParticipantModule } from './modules/participant/participant.module';
import { ParentChildrenModule } from './modules/parent_children/parent_children.module';
import { ApplicationModule } from './modules/application/application.module';
import { FileModule } from './modules/files/files.module';
import { RealEstateModule } from './modules/real_estate/real_estate.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentFilesView } from './modules/files/view/document_files.view';
import { ParticipantDocumentView } from './modules/document/views/participant_document.view';
import { ParticipantView } from './modules/participant/views/participant_view';
import { ApplicationViewEntity } from './modules/application/views/applicantion.view';
import { PassportEntity } from './modules/document/entities/passport.entity';
import {
  BirthCertificateEntity,
  DivorceCertificateEntity,
  MarriageCertificateEntity,
  SnilsEntity,
} from './modules/document/entities';
import {
  BuildAccountabilityMiddleware,
  GetTokenFromHeaderMiddleware,
} from './common/middleware';
import { FamilyDocumentsView } from './modules/family/views/family_documents.view';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: undefined,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.getOrThrow<'postgres'>('database.type'),
        host: config.getOrThrow<string>('database.host'),
        port: config.getOrThrow<number>('database.port'),
        username: config.getOrThrow<string>('database.username'),
        password: config.getOrThrow<string>('database.password'),
        database: config.getOrThrow<string>('database.database'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [
          AccountEntity,
          ApplicationEntity,
          FamilyEntity,
          FamilyDocumentsView,
          DocumentEntity,
          PassportEntity,
          BirthCertificateEntity,
          MarriageCertificateEntity,
          DivorceCertificateEntity,
          SnilsEntity,
          ParticipantEntity,
          QueueEntity,
          RealEstateEntity,
          FileEntity,
          ParentChildrenEntity,
          RoleEntity,
          DocumentFilesView,
          ParticipantDocumentView,
          ParticipantView,
          ApplicationViewEntity,
        ],
      }),
    }),
    AuthModule,
    AccountModule,
    ApplicationModule,
    FileModule,
    DocumentModule,
    ParticipantModule,
    ParentChildrenModule,
    RealEstateModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(GetTokenFromHeaderMiddleware, BuildAccountabilityMiddleware)
      .forRoutes('*');
  }
}
