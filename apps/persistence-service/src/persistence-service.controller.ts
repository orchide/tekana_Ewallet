import { RmqService } from './../../../libs/common/src/rmq/rmq.service';
import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { PersistenceServiceService } from './persistence-service.service';

@Controller()
export class PersistenceServiceController {
  constructor(
    private readonly rmqService: RmqService,
    private readonly persistenceServiceService: PersistenceServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.persistenceServiceService.getHello();
  }

  @EventPattern('confirmed_bill')
  async handleReceivedBill(@Payload() bill: any, @Ctx() context: RmqContext) {
    this.rmqService.acknowledge(context);

    const billData = JSON.stringify(bill);

    return await this.persistenceServiceService.persistTransaction(bill);
  }
  @EventPattern('failed_bill')
  async handleRejectedBill(@Payload() bill: any, @Ctx() context: RmqContext) {
    this.rmqService.acknowledge(context);

    const billData = JSON.stringify(bill);

    return await this.persistenceServiceService.persistRejectedBill(bill);
  }
}
