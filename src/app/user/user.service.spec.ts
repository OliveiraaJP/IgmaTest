import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('save', () => {
    it('save a new user w/ valid cpf', async () => {
      // Arrange
      const data: UserDto = {
        name: 'Dev',
        cpf: '22520895047',
        birthday: '22/04/1994',
      };
      const userEntityMock = { ...data } as UserEntity;

      jest.spyOn(userRepository, 'create').mockReturnValue(userEntityMock);
      jest.spyOn(userRepository, 'save').mockResolvedValue(userEntityMock);

      // Act
      const result = await userService.save(data);

      // Assert
      expect(result).toBeDefined();
      expect(userRepository.create).toBeCalledTimes(1);
      expect(userRepository.save).toBeCalledTimes(1);
    });
  });
  describe('find all', () => {
    it('should return all users', async () => {
      //Arrange
      const body: UserDto[] = [
        {
          name: 'Dev',
          cpf: '22520895047',
          birthday: '22/04/1994',
        },
        {
          name: 'Dev2',
          cpf: '52301849066',
          birthday: '22/04/1994',
        },
      ];
      const userEntityMock = { ...body } as UserEntity[];
      jest.spyOn(userRepository, 'find').mockResolvedValue(userEntityMock);

      //Act
      const result = await userService.findAll();

      //Assert
      expect(result).toBeDefined();
      expect(userRepository.find).toBeCalledTimes(1);
      expect(result['0'].name).toStrictEqual(body[0].name);
      expect(result['1'].cpf).toStrictEqual(body[1].cpf);
    });
    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.findAll()).rejects.toThrowError();
    });
  });
  describe('find one', () => {
    it('should return one user', async () => {
      //Arrange
      const body: UserDto = {
        name: 'Dev',
        cpf: '22520895047',
        birthday: '22/04/1994',
      };
      const userEntityMock = { ...body } as UserEntity;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntityMock);

      //Act
      const result = await userService.findOne(body.cpf);

      //Assert
      expect(result).toBeDefined();
      expect(userRepository.findOne).toBeCalledTimes(1);
      expect(body.cpf).toStrictEqual(result.cpf);
    });
    it('should throw error not found status code', () => {
      //Arrange
      jest
        .spyOn(userRepository, 'findOne')
        .mockRejectedValueOnce(new Error('Cpf not found!'));

      //Assert
      expect(userService.findOne('123456789')).rejects.toThrowError(
        new HttpException('Cpf not found!', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('delete cpf', () => {
    it('should throw error not found status code', () => {
      //Arrange
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.findOne('123456789')).rejects.toThrowError(
        new HttpException('Cpf not found!', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update user', () => {
    it('should throw error not found status code', () => {
      //Arrange
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.findOne('123456789')).rejects.toThrowError(
        new HttpException('Cpf not found!', HttpStatus.NOT_FOUND),
      );
    });
  });
});
