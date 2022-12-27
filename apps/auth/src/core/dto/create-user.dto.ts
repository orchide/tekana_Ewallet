import { Role } from '@app/common/core/enums/roles.enum';
import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { isEmpty } from 'rxjs';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
  readonly type: Role[];
}
