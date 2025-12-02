import React from "react";
import styles from "./ProblemTable.module.css";

import CheckIcon from "@/assets/images/check.svg";
import CrossIcon from "@/assets/images/cross.svg";
import CapyIcon from "@/assets/images/capy.png";
import BookmarkIcon from "@/assets/images/bookmark.svg";

import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { selectProblems, toggleBookmark } from "@/store/problem/slice.ts";
import { getInversifyProblemService } from "@/di/inversify";
import { PROBLEMS_PER_PAGE } from "@/constants";

interface Problem {
  id: string;
  title: string;
  difficulty: number; // 1..4
  submissions: number;
}
interface ProblemWithUserData extends Problem {
  status: "solved" | "attempted" | "none";
  isBookmarked: boolean;
}

const StatusIcon: React.FC<{ status: ProblemWithUserData["status"] }> = ({ status }) => {
  if (status === "solved")
    return (
      <span className={`${styles.statusBubble} ${styles.solved}`} title="Solved">
        <img src={CheckIcon} alt="" />
      </span>
    );
  if (status === "attempted")
    return (
      <span className={`${styles.statusBubble} ${styles.attempted}`} title="Attempted">
        <img src={CrossIcon} alt="" />
      </span>
    );
  return <span className={`${styles.statusBubble} ${styles.none}`} title="Not attempted" />;
};

const DifficultyMeter: React.FC<{ level: number }> = ({ level }) => {
  const total = 5;
  return (
    <span className={styles.difficulty} aria-label={`Difficulty ${level} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <img
          key={i}
          src={CapyIcon}
          alt=""
          className={`${styles.capy} ${i < level ? styles.capyOn : styles.capyOff}`}
        />
      ))}
    </span>
  );
};

const ProblemTable: React.FC = () => {
  const rows = useAppSelector(selectProblems) as ProblemWithUserData[];
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page")) || 1;
  const page = Math.min(Math.max(1, pageParam), Math.ceil(rows.length / PROBLEMS_PER_PAGE) || 1);
  const start = (page - 1) * PROBLEMS_PER_PAGE;
  const end = start + PROBLEMS_PER_PAGE;
  const visibleRows = rows.slice(start, end);

  const onToggleBookmark = async (id: string) => {
    const problemService = getInversifyProblemService();
    await problemService.toggleBookmark(id);
    dispatch(toggleBookmark(id));
  };

  return (
    <section className={styles.card} aria-label="Problems list">
      <div className={styles.scrollWrap}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={`${styles.th} ${styles.colStatus}`}>Status</th>
              <th className={`${styles.th} ${styles.colTitle}`}>Title</th>
              <th className={`${styles.th} ${styles.colDiff}`}>Difficulty</th>
              <th className={`${styles.th} ${styles.colSubs}`}>Submissions</th>
              <th className={`${styles.th} ${styles.colBm}`} aria-label="Bookmark" />
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {visibleRows.map((p, i) => (
              <tr key={p.id} className={styles.row}>
                <td className={`${styles.td} ${styles.colStatus}`}>
                  <StatusIcon status={p.status} />
                </td>

                <td className={`${styles.td} ${styles.colTitle}`}>
                  <a href={`/problems/${p.id}`} className={styles.titleLink}>
                    <span className={styles.index}>{start + i + 1}.</span>
                    <span className={styles.titleText}>{p.title}</span>
                  </a>
                </td>

                <td className={`${styles.td} ${styles.colDiff}`}>
                  <DifficultyMeter level={p.difficulty} />
                </td>

                <td className={`${styles.td} ${styles.colSubs}`}>
                  {p.submissions.toLocaleString()}
                </td>

                <td className={`${styles.td} ${styles.colBm}`}>
                  <button
                    type="button"
                    className={`${styles.bookmarkBtn} ${p.isBookmarked ? styles.active : ""}`}
                    aria-pressed={p.isBookmarked}
                    aria-label={p.isBookmarked ? "Remove bookmark" : "Add bookmark"}
                    onClick={() => onToggleBookmark(p.id)}
                  >
                    <img src={BookmarkIcon} alt="" className={styles.bookmarkIcon} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProblemTable;
