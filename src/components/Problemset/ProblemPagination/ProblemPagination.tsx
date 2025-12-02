import React from "react";
import styles from "./ProblemPagination.module.css";
import Button from "@/common/Button/Button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks.ts";
import { selectProblems } from "@/store/problem/slice.ts";
import { PROBLEMS_PER_PAGE } from "@/constants";

const ProblemPagination: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const problems = useAppSelector(selectProblems);
  const TOTAL_PAGES = Math.max(1, Math.ceil(problems.length / PROBLEMS_PER_PAGE) || 1);

  const pageParam = Number(searchParams.get("page")) || 1;
  const page = Math.min(Math.max(1, pageParam), TOTAL_PAGES);

  const goToPage = (p: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("page", String(p));
    navigate({ search: sp.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const start = Math.max(1, page - 1);
  const end = Math.min(TOTAL_PAGES, page + 1);

  const visiblePages: number[] = [];
  for (let i = start; i <= end; i++) visiblePages.push(i);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <Button
        variant="ghost"
        size="sm"
        text="<"
        aria-label="Previous page"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
      />

      {start > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            text="1"
            onClick={() => goToPage(1)}
            aria-label="Go to page 1"
          />
          {start > 2 && (
            <span className={styles.ellipsis} aria-hidden>
              ...
            </span>
          )}
        </>
      )}

      {visiblePages.map((p) => (
        <Button
          key={p}
          variant="ghost"
          size="sm"
          text={p.toString()}
          active={p === page}
          onClick={() => goToPage(p)}
          aria-current={p === page ? "page" : undefined}
          aria-label={`Go to page ${p}`}
        />
      ))}

      {end < TOTAL_PAGES && (
        <>
          {end < TOTAL_PAGES - 1 && (
            <span className={styles.ellipsis} aria-hidden>
              ...
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            text={TOTAL_PAGES.toString()}
            onClick={() => goToPage(TOTAL_PAGES)}
            aria-label={`Go to page ${TOTAL_PAGES}`}
          />
        </>
      )}

      <Button
        variant="ghost"
        size="sm"
        text=">"
        aria-label="Next page"
        onClick={() => goToPage(page + 1)}
        disabled={page >= TOTAL_PAGES}
      />
    </nav>
  );
};

export default ProblemPagination;
