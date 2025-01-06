import { Body, Controller, Param, Patch } from '@nestjs/common';
import { FamilyService } from './family.service';
import FamilyEntity from './family.entity';
import { FamilyUpdateEntityDTO } from './dto/family.update';

@Controller('family')
class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Patch('/:id')
  async updateFamily(
    @Param('id') id: string,
    @Body() body: FamilyUpdateEntityDTO,
  ) {
    const { isLarge, isMarried } = body;

    const familyEntity = new FamilyEntity();
    familyEntity.id = Number(id);
    familyEntity.isLarge = isLarge;
    familyEntity.isMarried = isMarried;

    const updateResult = await this.familyService.updateFamily(
      Number(id),
      familyEntity,
    );

    return {
      data: updateResult,
    };
  }
}

export { FamilyController };
