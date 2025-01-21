import { IsBoolean } from 'class-validator';

class FamilyUpdateEntityDTO {
  @IsBoolean()
  isLarge: boolean;

  @IsBoolean()
  isMarried: boolean;
}

export { FamilyUpdateEntityDTO };
