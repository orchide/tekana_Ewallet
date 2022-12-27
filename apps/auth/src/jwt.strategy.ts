import { ConfigService } from '@nestjs/config';
import { User } from './../../../libs/common/src/database/Models/model.user';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWTKEY'),
    });
  }

  async validate(payload: any) {
    // check if user in the token actually exist
    const user = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }
    return user;
  }
}
