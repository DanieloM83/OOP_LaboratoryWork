import { type ProblemWithUserDataType } from "./types/problem";
import { type UserType } from "./types/user";

export const PROBLEMS_PER_PAGE = 5;

export const MOCK_USER_DATA: UserType = {
  isAuth: true,
  username: "danylo",
  email: "danylo@gmail.com",
  password: "12345678",
};
export const MOCK_PROBLEMS: ProblemWithUserDataType[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: 2,
    submissions: 100,
    status: "solved",
    isBookmarked: false,
  },
  {
    id: "three-sum",
    title: "Three Sum",
    difficulty: 3,
    submissions: 150,
    status: "attempted",
    isBookmarked: true,
  },
  {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: 4,
    submissions: 200,
    status: "none",
    isBookmarked: false,
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: 3,
    submissions: 120,
    status: "solved",
    isBookmarked: true,
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: 1,
    submissions: 80,
    status: "none",
    isBookmarked: false,
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: 3,
    submissions: 130,
    status: "attempted",
    isBookmarked: false,
  },
  {
    id: "binary-tree-inorder-traversal",
    title: "Binary Tree Inorder Traversal",
    difficulty: 2,
    submissions: 90,
    status: "solved",
    isBookmarked: true,
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: 1,
    submissions: 70,
    status: "none",
    isBookmarked: false,
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: 2,
    submissions: 110,
    status: "attempted",
    isBookmarked: true,
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: 4,
    submissions: 160,
    status: "none",
    isBookmarked: false,
  },
];
