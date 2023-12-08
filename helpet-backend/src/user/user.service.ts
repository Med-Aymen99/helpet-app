import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async register(userData: UserRegisterDto)  {  
    const user = this.userRepository.create(userData);
    user.salt = await bcrypt.genSalt();
    user.password =  await bcrypt.hash(user.password, user.salt);

    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(`Probleme !`)
    }
    
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    };
  }

  async login(credentials: LoginCredentialsDto) {
    const {username, password} = credentials;
    console.log("in login")
    const user = await this.userRepository.createQueryBuilder('user')
      .where("user.username = :username", {username,})
      .getOne();
    if (!user)
      throw new NotFoundException("ce username n'existe pas")
    
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword == user.password) {
      const payload =  {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      // generate the jwt token using the user info in the payload
      const jwt = this.jwtService.sign(payload);
      return {
        "acces_token" : jwt,
        "user": payload
      }
    }

  }

  isOwnerOrAdmin(objet, user) {
    console.log("objet.user", objet.user)
    console.log("objet.user.id", objet.user.id)
    console.log("user.id =", user.id)
    return user.role === UserRoleEnum.ADMIN || (objet.user && objet.user.id === user.id);
  }

  async findAll(options = null): Promise<UserEntity[]> {
    if (options) {
      return await this.userRepository.find(options);
    }
    return await this.userRepository.find();
  }
}
