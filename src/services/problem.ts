import { MOCK_PROBLEMS } from "@/constants";
import type { ProblemType, ProblemWithUserDataType } from "@/types/problem";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export type ListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  difficulty?: ProblemType["difficulty"];
  status?: ProblemWithUserDataType["status"] | "all";
  bookmarked?: boolean;
};

export class ProblemService {
  // Keep a private mutable copy decoupled from any Redux-frozen instances
  private items: ProblemWithUserDataType[] = MOCK_PROBLEMS.map((p) => ({ ...p }));

  async list(params: ListParams = {}) {
    await delay();
    const { page = 1, pageSize = 10, search, difficulty, status = "all", bookmarked } = params;
    let data = [...this.items];
    if (typeof search === "string" && search.trim()) {
      const q = search.trim().toLowerCase();
      data = data.filter(
        (p) => p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
      );
    }
    if (difficulty) data = data.filter((p) => p.difficulty === difficulty);
    if (status !== "all") data = data.filter((p) => p.status === status);
    if (typeof bookmarked === "boolean") data = data.filter((p) => p.isBookmarked === bookmarked);

    const total = data.length;
    const start = (page - 1) * pageSize;
    const items = data.slice(start, start + pageSize).map((p) => ({ ...p }));
    return { items, total, page, pageSize };
  }

  async getById(id: ProblemType["id"]): Promise<ProblemWithUserDataType | null> {
    await delay();
    const found = this.items.find((p) => p.id === id);
    return found ? { ...found } : null;
  }

  async create(
    problem: ProblemType & Partial<Pick<ProblemWithUserDataType, "status" | "isBookmarked">>
  ): Promise<ProblemWithUserDataType> {
    await delay();
    const exists = this.items.some((p) => p.id === problem.id);
    if (exists) throw new Error("Problem with this id already exists");
    const newItem: ProblemWithUserDataType = {
      ...problem,
      status: problem.status ?? "none",
      isBookmarked: problem.isBookmarked ?? false,
    };
    this.items.push(newItem);
    return { ...newItem };
  }

  async update(
    id: ProblemType["id"],
    changes: Partial<ProblemWithUserDataType>
  ): Promise<ProblemWithUserDataType | null> {
    await delay();
    const idx = this.items.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...changes };
    return { ...this.items[idx] };
  }

  async remove(id: ProblemType["id"]): Promise<boolean> {
    await delay();
    const before = this.items.length;
    this.items = this.items.filter((p) => p.id !== id);
    return this.items.length < before;
  }

  async toggleBookmark(id: ProblemType["id"]): Promise<ProblemWithUserDataType | null> {
    await delay();
    const item = this.items.find((p) => p.id === id);
    if (!item) return null;
    item.isBookmarked = !item.isBookmarked;
    return { ...item };
  }

  async setStatus(
    id: ProblemType["id"],
    status: ProblemWithUserDataType["status"]
  ): Promise<ProblemWithUserDataType | null> {
    await delay();
    const item = this.items.find((p) => p.id === id);
    if (!item) return null;
    item.status = status;
    return { ...item };
  }
}

export const problemService = new ProblemService();
