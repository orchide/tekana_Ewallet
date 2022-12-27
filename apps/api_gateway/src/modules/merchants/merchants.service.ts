import { Merchant } from '@app/common/database/Models/model.merchant';
import { Injectable } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';

@Injectable()
export class MerchantsService {
  create(createMerchantDto: any, userId) {
    return Merchant.create({
      userId,
      name: createMerchantDto.name,
      address: createMerchantDto.address,
    });
  }

  findAll() {
    return `This action returns all merchants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merchant`;
  }

  update(id: number, updateMerchantDto: UpdateMerchantDto) {
    return `This action updates a #${id} merchant`;
  }

  remove(id: number) {
    return `This action removes a #${id} merchant`;
  }
}
