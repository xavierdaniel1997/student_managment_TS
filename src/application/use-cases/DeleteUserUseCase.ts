import { UserRepository } from "../../domain/repositories/UserRepository";

interface DeleteUserInput {
  userId: string;
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: DeleteUserInput): Promise<boolean> {
    const existingUser = await this.userRepository.getUserById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const isDeleted = await this.userRepository.deleteUser(userId);

    if (!isDeleted) {
      throw new Error("Failed to delete user");
    }

    return true;
  }
}
