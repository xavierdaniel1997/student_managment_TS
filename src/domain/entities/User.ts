export type UserRole = "user" | "admin";

export interface User {
  id?: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: UserRole;
    department?: string;
    age?: number;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: number;
    };
}
