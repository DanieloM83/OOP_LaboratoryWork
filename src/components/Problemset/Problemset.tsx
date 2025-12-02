import { useEffect } from "react";
import styles from "./Problemset.module.css";
import Header from "@/components/Header";
import ProblemTable from "./ProblemTable/ProblemTable";
import ProblemPagination from "./ProblemPagination/ProblemPagination";
import { problemService } from "@/services";
import { useAppDispatch } from "@/store/hooks.ts";
import { setProblems } from "@/store/problem/slice.ts";

const Problemset = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let ignore = false;
    (async () => {
      // Load all items once to keep Redux as the single source of truth for pagination
      const { items } = await problemService.list({ page: 1, pageSize: Number.MAX_SAFE_INTEGER });
      if (!ignore) dispatch(setProblems(items));
    })();
    return () => {
      ignore = true;
    };
  }, [dispatch]);
  return (
    <>
      <Header />
      <section className={styles.hero} aria-labelledby="homeTitle">
        <ProblemTable />
        <ProblemPagination />
      </section>
    </>
  );
};

export default Problemset;
