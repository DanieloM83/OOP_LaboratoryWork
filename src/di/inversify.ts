import "reflect-metadata";
import { Container, injectable, inject } from "inversify";
import type { ProblemService } from "@/services/problem";
import { ProblemService as ProblemServiceClass } from "@/services/problem";
import type { UserService } from "@/services/user";
import { UserService as UserServiceClass } from "@/services/user";

const TYPES = {
  UserService: Symbol.for("UserService"),
  ProblemService: Symbol.for("ProblemService"),
  AppService: Symbol.for("AppService"),
};

@injectable()
class AppService {
  constructor(
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.ProblemService) private readonly problemService: ProblemService
  ) {}

  async summary(): Promise<string> {
    const user = await this.userService.getCurrentUser();
    const list = await this.problemService.list({ pageSize: 1 });
    const first = list.items[0]?.id ?? "-";
    return `user=${user?.username ?? ""}, auth=${Boolean(user?.isAuth)}, problems=${list.total}, first=${first}`;
  }
}

// Create a local container and register existing service instances
const container = new Container({ defaultScope: "Singleton" });
container.bind<UserService>(TYPES.UserService).toConstantValue(new UserServiceClass());
container.bind<ProblemService>(TYPES.ProblemService).toConstantValue(new ProblemServiceClass());
container.bind<AppService>(TYPES.AppService).to(AppService);

export async function runInversifyDemo(): Promise<string> {
  const app = container.get<AppService>(TYPES.AppService);
  return app.summary();
}

export function getInversifyUserService() {
  return container.get<UserService>(TYPES.UserService);
}

export function getInversifyProblemService() {
  return container.get<ProblemService>(TYPES.ProblemService);
}
