import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(data: UserDto): Promise<UserEntity> {
    data.cpf = data.cpf.replace(/[^\d]+/g, '');
    return this.userRepository.save(this.userRepository.create(data));
  }

  async findAll(page = 1, take = 5): Promise<UserEntity[]> {
    return this.userRepository.find({ skip: page, take: take });
  }

  async findOne(cpf: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ cpf });
    if (!user) throw new HttpException('Cpf not found!', HttpStatus.NOT_FOUND);
    return user;
  }
}
