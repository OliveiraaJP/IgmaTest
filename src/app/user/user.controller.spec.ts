import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            deleteCpf: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new user w/ sucess', async () => {
      //Arrange
      const body: UserDto = {
        name: 'Dev',
        cpf: '22520895047',
        birthday: '22/04/1994',
      };
      const userEntityMock = { ...body } as UserEntity;
      jest.spyOn(userService, 'save').mockResolvedValue(userEntityMock);

      //Act
      const result = await userController.save(body);

      //Assert
      expect(result).toBeDefined();
      expect(userService.save).toBeCalledTimes(1);
    });
  });

  describe('listOne', () => {
    it('should return 1 user', async () => {
      //Arrange
      const body: UserDto = {
        name: 'Dev',
        cpf: '22520895047',
        birthday: '22/04/1994',
      };
      const userEntityMock = { ...body } as UserEntity;
      jest.spyOn(userService, 'findOne').mockResolvedValue(userEntityMock);

      //Act
      const result = await userController.listOne(body.cpf);

      //Assert
      expect(result).toBeDefined();
      expect(userService.findOne).toBeCalledTimes(1);
      expect(body.cpf).toStrictEqual(result.cpf);
    });
  });

  describe('listAll', () => {
    it('should return all user', async () => {
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
      jest.spyOn(userService, 'findAll').mockResolvedValue(userEntityMock);

      //Act
      const result = await userController.listAll();

      //Assert
      expect(result).toBeDefined();
      expect(userService.findAll).toBeCalledTimes(1);
      expect(result['0'].name).toStrictEqual(body[0].name);
      expect(result['1'].cpf).toStrictEqual(body[1].cpf);
    });
  });

  describe('delete cpf', () => {
    it('should delete cpf', async () => {
      jest
        .spyOn(userService, 'deleteCpf')
        .mockResolvedValue('asd' as unknown as Promise<DeleteResult>);

      //Act
      const result = await userController.deleteCpf('123456789');

      //Assert
      expect(result).toBeDefined();
      expect(userService.deleteCpf).toBeCalledTimes(1);
    });
  });
});
