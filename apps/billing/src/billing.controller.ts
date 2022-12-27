import { RmqService } from '@app/common';
import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern('bill_created')
  async handleReceivedBill(@Payload() bill: any, @Ctx() context: RmqContext) {
    new Logger('We have received your bill ');
    this.rmqService.acknowledge(context);
  }
}
