import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from './constants/services';

@Injectable()
export class ApiGatewayService {
  // constructor(@Inject(BILLING_SERVICE) private billingClient: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  // async createBill(request: any) {
  //   this.billingClient.emit('bill_created', {
  //     request,
  //   });
  // }
}
