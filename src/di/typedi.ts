import "reflect-metadata";
import { Container, Token } from "typedi";
import type { ProblemService } from "@/services/problem";
import { ProblemService as ProblemServiceClass } from "@/services/problem";
import type { UserService } from "@/services/user";
import { UserService as UserServiceClass } from "@/services/user";

const USER_TOKEN = new Token<UserService>("UserService");
const PROBLEM_TOKEN = new Token<ProblemService>("ProblemService");

// Using tokens and direct container access for this minimal demo

// Provide existing instances under tokens
Container.set(USER_TOKEN, new UserServiceClass());
Container.set(PROBLEM_TOKEN, new ProblemServiceClass());

export async function runTypeDiDemo(): Promise<string> {
  // Avoid constructor injection to keep demo resilient in bundler/dev mode
  const userService = Container.get(USER_TOKEN);
  const problemService = Container.get(PROBLEM_TOKEN);
  const user = await userService.getCurrentUser();
  const list = await problemService.list({ pageSize: 1 });
  const first = list.items[0]?.id ?? "-";
  return `user=${user?.username ?? ""}, auth=${Boolean(user?.isAuth)}, problems=${list.total}, first=${first}`;
}

export const TYPE_DI = {
  USER_TOKEN,
  PROBLEM_TOKEN,
  Container,
};

export function getTypeDiUserService() {
  return Container.get(USER_TOKEN);
}

export function getTypeDiProblemService() {
  return Container.get(PROBLEM_TOKEN);
}
