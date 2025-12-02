type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
type UserStatus = "solved" | "attempted" | "none";

export interface ProblemType {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  submissions: number;
}

export interface ProblemWithUserDataType extends ProblemType {
  status: UserStatus;
  isBookmarked: boolean;
}
