import { User } from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

export interface AuthResponse {
  accessToken: string;
}

export interface SignTokenPayload {
  userId: number;
}
