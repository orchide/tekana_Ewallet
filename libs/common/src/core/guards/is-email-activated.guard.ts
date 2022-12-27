import { User } from './../../database/Models/model.user';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsEmailActivatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();

    return this.activeEmail(request.user.dataValues.email);
  }

  async activeEmail(email: any) {
    const isEmailActive: any = await User.findOne(email);

    if (!isEmailActive.dataValues.isEmailVerified) {
      throw new ForbiddenException(
        'Please check your inbox and confirm your email first',
      );
    }

    return true;
  }
}
