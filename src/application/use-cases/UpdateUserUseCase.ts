import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

interface UpdateUserInput {
  userId: string;
  userData: Partial<User>;
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId, userData }: UpdateUserInput): Promise<User> {
    const existingUser = await this.userRepository.getUserById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const { password, ...filteredUserData } = userData;

    const updatedUser = await this.userRepository.updateUser(userId, filteredUserData);
    if (!updatedUser) {
      throw new Error("Failed to update user");
    }

    return updatedUser;
  }
}
