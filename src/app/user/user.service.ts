import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
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
    const { cpf } = data;
    const user = await this.userRepository.findOne({ cpf });
    if (user)
      throw new HttpException('Cpf already registered!', HttpStatus.CONFLICT);
    return this.userRepository.save(this.userRepository.create(data));
  }

  async findAll(page = 0, take = 5): Promise<UserEntity[]> {
    return this.userRepository.find({ skip: page, take: take });
  }

  async findOne(cpf: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ cpf });
    if (!user) throw new HttpException('Cpf not found!', HttpStatus.NOT_FOUND);
    return user;
  }

  async deleteCpf(cpf: string): Promise<DeleteResult> {
    try {
      await this.userRepository.findOneOrFail({ cpf });
      const user = await this.userRepository
        .createQueryBuilder('user')
        .delete()
        .from(UserEntity)
        .where('cpf = :cpf', { cpf })
        .execute();
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(body: UpdateUserDto, cpf: string) {
    const user = await this.userRepository.findOne({ cpf });
    const { name, birthday } = body;
    if (!user) throw new HttpException('Cpf not found!', HttpStatus.NOT_FOUND);
    if (body['cpf'])
      throw new HttpException('Cpf cannot be change!', HttpStatus.FORBIDDEN);
    return await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ name, birthday })
      .where('cpf = :cpf', { cpf })
      .execute();
  }
}
