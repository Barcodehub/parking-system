import { UserRepository } from '../repositories/user.repository';
import { UserDTO, CreateUserDTO } from '../dtos/user.dto';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData: CreateUserDTO): Promise<UserDTO> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user = await this.userRepository.create(userData);
    return new UserDTO(user);
  }

  async getUserById(id: number): Promise<UserDTO | null> {
    const user = await this.userRepository.findById(id);
    return user ? new UserDTO(user) : null;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => new UserDTO(user));
  }
}