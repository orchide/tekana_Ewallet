import { Merchant } from '@app/common/database/Models/model.merchant';
import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class CreateBillingDto {
  @IsNotEmpty()
  readonly amount: number;

  @IsNotEmpty()
  @MinLength(1)
  readonly merchant_Id: number;

  @IsNotEmpty()
  @MinLength(1)
  readonly user_Id: number;
}
