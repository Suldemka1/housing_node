import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationUpdateEntityDTO } from './dto/application.update';
import { ApplicationEntityCreateDTO } from './dto/application.create';

@Controller('application')
class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/')
  async createApplication(@Body() body: ApplicationEntityCreateDTO) {
    try {
      const data = await this.applicationService.createDraftApplication(body);
      return { data: data };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post('/setQueue/:id')
  async setQueue(@Param('id') id: number) {
    return { data: id };
  }

  @Get('/draft')
  async getDraftApplications() {
    const data = await this.applicationService.getDraftApplications();
    return { data };
  }

  @Get('/:id')
  async getDraftApplicationById(@Param('id') id: number) {
    const application = await this.applicationService.getApplicationById(id);
    const data = {
      id: application.id,
      applicant: application.applicant,
      spouse: application.applicant.spouse,
      children: application.applicant.children.map((child) => child.child),
      family: application.applicant.family,
    };

    delete application.applicant.family;
    delete application.applicant.spouse;
    delete application.applicant.children;

    return {
      data,
    };
    // return {
    //   data: {
    //     applicant: {
    //       id: 'c548a75c-3b91-4cae-a47b-6ab24be6ce44',
    //       surname: 'Хирлиг-оолsss',
    //       name: 'Сулдем',
    //       patronymic: 'Мергенович',
    //       documents: [
    //         {
    //           id: '5cfaef0b-5c95-4658-9ead-de106c292094',
    //           type: 'PASSPORT',
    //           series: '4518',
    //           number: '611872',
    //           issuer: 'ГУ МВД РОССИИ ПО Г. МОСКВЕ',
    //           issued_date: '2025-01-09T17:00:00.000Z',
    //           birthdate: '2025-01-09T17:00:00.000Z',
    //           files: [
    //             {
    //               file: {} as File,
    //               preview:
    //                 'https://marketplace.yurta.site/files/c548a75c-3b91-4cae-a47b-6ab24be6ce44',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     spouse: {
    //       id: 'c548a75c-3b91-4cae-a47b-6ab24be6ce45',
    //       surname: 'Иргит',
    //       name: 'Дедрон',
    //       patronymic: 'Багай-ооловна',
    //       documents: [
    //         {
    //           id: '9f806cb3-663c-4c76-a522-e5ade1a8a26d',
    //           type: 'PASSPORT',
    //           series: '4562',
    //           number: '456456',
    //           issuer: 'МВД',
    //           issued_date: '2025-01-09T17:00:00.000Z',
    //           birthdate: '2025-01-16T17:00:00.000Z',
    //           files: [
    //             {
    //               file: {} as File,
    //               preview:
    //                 'https://marketplace.yurta.site/files/c548a75c-3b91-4cae-a47b-6ab24be6ce44',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     children: [
    //       {
    //         id: 'b6331ca6-7b4e-4e7f-829c-b54bc904d556',
    //         surname: 'Хирлиг-оол',
    //         name: 'Алдын',
    //         patronymic: 'Сулдемович',
    //         documents: [
    //           {
    //             id: 'f42f9bac-94e5-45a8-b985-ed27959ce653',
    //             type: 'CERTIFICATE',
    //             series: 'ЛЖ1',
    //             number: '456456',
    //             issuer: 'ЗАГС',
    //             issued_date: '2025-01-10T17:00:00.000Z',
    //             birthdate: '2025-01-18T17:00:00.000Z',
    //             files: [
    //               {
    //                 file: {} as File,
    //                 preview:
    //                   'https://marketplace.yurta.site/files/c548a75c-3b91-4cae-a47b-6ab24be6ce44',
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // };
  }

  @Patch('/:id')
  async updateApplication(
    @Param('id') id: string,
    @Body() body: ApplicationUpdateEntityDTO,
  ) {
    console.log(id);
    console.log(body);

    return { data: body };
  }

  @Delete('/:id')
  async deleteApplication(@Param('id') id: number) {
    const data = await this.applicationService.deleteApplication(id);
    return { data };
  }
}

export { ApplicationController };
