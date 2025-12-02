// import { MOCK_USER_DATA } from "@/constants";
import type { UserCredentialsType, UserType } from "@/types/user";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export class UserService {
  // Start logged out by default
  private currentUser: UserType | null = null;

  async getCurrentUser(): Promise<UserType | null> {
    await delay();
    return this.currentUser ? { ...this.currentUser } : null;
  }

  async login(
    credentials: (UserCredentialsType | { username: string; password: string }) & {
      username?: string;
      email?: string;
    }
  ): Promise<UserType> {
    await delay();
    // Stub: Accept any credentials; in real app this would call API and validate
    const username =
      "username" in credentials && credentials.username
        ? credentials.username
        : credentials.email
          ? credentials.email.split("@")[0] ?? "user"
          : "user";
    const email =
      "email" in credentials && credentials.email
        ? credentials.email
        : `${username}@example.com`;
    const user: UserType = {
      isAuth: true,
      username,
      email,
      password: credentials.password,
    };
    this.currentUser = user;
    return { ...user };
  }

  async register(data: { username: string } & UserCredentialsType): Promise<UserType> {
    await delay();
    // Stub: Treat registration as immediate login
    const user: UserType = {
      isAuth: true,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    this.currentUser = user;
    return { ...user };
  }

  async setAuth(isAuth: boolean): Promise<UserType | null> {
    await delay();
    if (!this.currentUser) return null;
    this.currentUser = { ...this.currentUser, isAuth };
    return { ...this.currentUser };
  }

  async logout(): Promise<void> {
    await delay();
    if (this.currentUser) this.currentUser.isAuth = false;
  }

  async deleteAccount(): Promise<void> {
    await delay();
    this.currentUser = null;
  }
}

export const userService = new UserService();
