import { Test, TestingModule } from '@nestjs/testing';
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
      jest.spyOn(userController, 'save').mockResolvedValue(userEntityMock);

      //Act
      const result = await userController.save(body);

      //Assert
      expect(result).toBeDefined();
      expect(userController.save).toBeCalledTimes(1);
    });
  });
});
