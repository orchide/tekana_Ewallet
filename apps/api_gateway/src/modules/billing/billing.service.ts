import { Bill } from '@app/common';
import { Wallet } from '@app/common/database/Models/model.wallet';
import {
  Injectable,
  HttpException,
  Inject,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE, PERSISTENCE_SERVICE } from '../../constants/services';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@Injectable()
export class BillingService {
  constructor(
    @Inject(PERSISTENCE_SERVICE) private persistenceService: ClientProxy,
  ) {}

  async create(billData: any) {
    // check if the paying individual has enough

    const userWallet: any = await Wallet.findOne({
      where: {
        id: billData.user_Id,
      },
    });

    if (!userWallet) return new HttpException('Invalid user', 400);

    const availableBalance: number = parseFloat(userWallet.dataValues.balance);
    const dueBalance: number = parseFloat(billData.amount);

    if (availableBalance >= dueBalance) {
      const message: any = {
        user_Id: billData.user_Id,
        amount: billData.amount,
        merchant_Id: billData.merchant_Id,
      };
      try {
        this.persistenceService.emit('confirmed_bill', message);

        return {
          message: ' Successfully paid , you should receive your receipt soon ',
        };
      } catch (error) {
        return new HttpException('500', error);
      }
    } else {
      return new HttpException('Insufficient funds', 400);
    }
  }

  async findAll(id: number | string) {
    return await Bill.findAll({
      where: {
        id,
      },
    });
  }

  async findOne(id: number, user_Id) {
    return await Bill.findOne({
      where: {
        id,
        user_Id,
      },
    });
  }

  async update(id: number, data: any, user_Id) {
    return await Bill.update(data, {
      where: {
        id,
        user_Id,
      },
    });
  }

  async remove(id: number, user_Id) {
    return await Bill.destroy({
      where: {
        user_Id,
        id,
      },
    });
  }
}
