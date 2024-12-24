import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<User | null> {
    
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
