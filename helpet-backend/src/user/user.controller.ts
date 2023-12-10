import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';


@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(
    @Body() userData: UserRegisterDto
  ) {
    return this.userService.register(userData);
  }

  @Post('login')
  login(
    @Body() credentials: LoginCredentialsDto
  ) {
    return this.userService.login(credentials);
  }

  
  @Get('all')
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  
}
