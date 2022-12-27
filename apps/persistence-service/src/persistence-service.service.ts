import { Sequelize, where } from 'sequelize/types';
import { Bill_Status } from './../../../libs/common/src/core/enums/bill_status.enum';
import { Bill } from './../../../libs/common/src/database/Models/model.bill';
import { Injectable } from '@nestjs/common';
import { Wallet } from '@app/common/database/Models/model.wallet';
import sequelize from 'sequelize';

@Injectable()
export class PersistenceServiceService {
  async persistRejectedBill(bill: any) {
    await Bill.create({
      user_Id: bill.user_Id,
      status: Bill_Status.REJECTED,
      amount: bill.amount,
      receiver: bill.receiver,
    });
  }
  async persistTransaction(bill: any) {
    await Bill.create({
      user_Id: bill.user_Id,
      status: Bill_Status.PAID,
      amount: bill.amount,
      receiver: bill.receiver,
    });

    await Wallet.decrement('balance', {
      by: bill.amount,
      where: {
        userId: bill.user_Id,
      },
    });

    await Wallet.increment('balance', {
      by: bill.amount,
      where: {
        userId: bill.receiver,
      },
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
