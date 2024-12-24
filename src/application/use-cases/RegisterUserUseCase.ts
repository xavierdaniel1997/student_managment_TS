import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import bcrypt from "bcryptjs"; 

export class RegisterUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository; //this is Inject UserRepository dependency
  }

  async execute(user: User): Promise<User> {
    const existingEmail = await this.userRepository.getUserByEmail(user.email);
    if (existingEmail) {
      throw new Error("Email already exists.");
    }

    this.validateUserInput(user);

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: User = { ...user, password: hashedPassword };

    const createdUser = await this.userRepository.createUser(newUser);

    return createdUser;
  }

  private validateUserInput(user: User) {
    if (!user.first_name || !user.last_name || !user.email || !user.password || !user.role) {
      throw new Error("All required fields must be provided.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      throw new Error("Invalid email format.");
    }
    
    if (user.password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
  }
}
