import { Sequelize, where } from 'sequelize/types';
import { Bill_Status } from './../../../libs/common/src/core/enums/bill_status.enum';
import { Bill } from './../../../libs/common/src/database/Models/model.bill';
import { Injectable } from '@nestjs/common';
import { Wallet } from '@app/common/database/Models/model.wallet';
import sequelize from 'sequelize';

@Injectable()
export class PersistenceServiceService {
  async persistTransaction(bill: any) {
    await Bill.create({
      user_Id: bill.user_Id,
      status: Bill_Status.PAID,
      amount: bill.amount,
      merchant_Id: bill.merchant_Id,
    });

    await Wallet.decrement('balance', {
      by: bill.amount,
      where: {
        userId: bill.user_Id,
      },
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
