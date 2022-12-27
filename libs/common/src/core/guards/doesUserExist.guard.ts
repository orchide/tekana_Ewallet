import { User } from './../../database/Models/model.user';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DoesUserExist implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any) {
    const userExist = await User.findOne({
      where: {
        email: request.body.email,
      },
    });
    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }
    return true;
  }
}
