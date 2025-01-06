import configuration from './config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FamilyModule } from './family/family.module';
import { DocumentModule } from './document/document.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueEntity } from './queue/queue.entity';
import { ApplicationEntity } from './application/application.entity';
import FamilyEntity from './family/family.entity';
import { ParticipantEntity } from './participant/participant.entity';
import { DocumentEntity } from './document/document.entity';
import { AccountEntity } from './account/account.entity';
import { RealEstateEntity } from './real_estate/real_estate.entity';
import { FileEntity } from './files/files.entity';
import { ParentChildrenEntity } from './parent_children/parent_children.entity';
import { RoleEntity } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { ParticipantModule } from './participant/participant.module';
import { ParentChildrenModule } from './parent_children/parent_children.module';
import { ApplicationModule } from './application/application.module';
import { FileModule } from './files/files.module';
import { RealEstateModule } from './real_estate/real_estate.module';

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
          DocumentEntity,
          ParticipantEntity,
          QueueEntity,
          RealEstateEntity,
          FileEntity,
          ParentChildrenEntity,
          RoleEntity,
        ],
      }),
    }),
    ApplicationModule,
    FamilyModule,
    FileModule,
    DocumentModule,
    ParticipantModule,
    ParentChildrenModule,
    RealEstateModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
