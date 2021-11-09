import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JWTPayload } from '../helpers/jwt.helper';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GraphqlStrategy extends PassportStrategy(Strategy, 'graphql') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'ravn_nerdery',
    });
  }

  async validate(payload: JWTPayload) {
    return payload;
  }
}
