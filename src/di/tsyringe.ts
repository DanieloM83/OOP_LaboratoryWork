import "reflect-metadata";
import { container, injectable, inject } from "tsyringe";
import type { ProblemService } from "@/services/problem";
import { ProblemService as ProblemServiceClass } from "@/services/problem";
import type { UserService } from "@/services/user";
import { UserService as UserServiceClass } from "@/services/user";

const TOKENS = {
  UserService: "UserService",
  ProblemService: "ProblemService",
} as const;

@injectable()
class AppService {
  constructor(
    @inject(TOKENS.UserService) private readonly userService: UserService,
    @inject(TOKENS.ProblemService) private readonly problemService: ProblemService
  ) {}

  async summary(): Promise<string> {
    const user = await this.userService.getCurrentUser();
    const list = await this.problemService.list({ pageSize: 1 });
    const first = list.items[0]?.id ?? "-";
    return `user=${user?.username ?? ""}, auth=${Boolean(user?.isAuth)}, problems=${list.total}, first=${first}`;
  }
}

// Register existing instances so we don't have to decorate service classes
container.registerInstance<UserService>(TOKENS.UserService, new UserServiceClass());
container.registerInstance<ProblemService>(TOKENS.ProblemService, new ProblemServiceClass());

export async function runTsyringeDemo(): Promise<string> {
  const app = container.resolve(AppService);
  return app.summary();
}

export function getTsyringeUserService() {
  return container.resolve<UserService>(TOKENS.UserService as unknown as any);
}

export function getTsyringeProblemService() {
  return container.resolve<ProblemService>(TOKENS.ProblemService as unknown as any);
}
