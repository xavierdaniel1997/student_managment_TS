import { UserRepository } from "../../domain/repositories/UserRepository";
import { IUser } from "../../infrastructure/database/models/UserModel";

export class GetAllUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<IUser[]> {
        return await this.userRepository.getAllUsers();
    }
}