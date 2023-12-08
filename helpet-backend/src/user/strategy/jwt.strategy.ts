import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { PayloadInterface } from '../interfaces/payload.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
  ) {
    /* Passport first verifies the JWT's signature 
    and decodes the JSON. It then invokes our validate() method 
    passing the decoded JSON */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });

  }

 /*  Passport will build a user object based on the return value of our validate() method, 
  and attach it as a property on the Request object */
  
  async validate(payload: PayloadInterface) {
    const user = await this.userRepo.findOne({
        where: {username: payload.username}
    });
    
    if (user) {
        delete user.salt;
        delete user.password;
        return user;
    } else {
        throw new UnauthorizedException();
    }
  }
}
