import { Wallet } from './../../../../../libs/common/src/database/Models/model.wallet';

import { Injectable } from '@nestjs/common';
import bodyParser from 'body-parser';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  create(createWalletDto: any, userId: any) {
    return Wallet.create({
      balance: createWalletDto.balance,
      userId,
    });
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
