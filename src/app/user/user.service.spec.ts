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
});
