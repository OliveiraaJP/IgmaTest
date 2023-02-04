import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CpfFormatValidator } from './validator/cpf-format.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, CpfFormatValidator],
  controllers: [UserController],
})
export class UserModule {}
