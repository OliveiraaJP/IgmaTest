import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async save(@Body() body: UserDto): Promise<UserEntity> {
    return this.userService.save(body);
  }

  @Get()
  async listAll(
    @Query('page') page?: number,
    @Query('take') take?: number,
  ): Promise<UserEntity[]> {
    return this.userService.findAll(page, take);
  }

  @Get(':cpf')
  async listOne(@Param('cpf') cpf: string): Promise<UserEntity> {
    return this.userService.findOne(cpf);
  }
}
