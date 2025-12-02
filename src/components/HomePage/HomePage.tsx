import React from "react";
import styles from "./HomePage.module.css";
import { Button } from "@/common";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <section className={styles.hero} aria-labelledby="homeTitle">
        <div className={styles.container}>
          <h1 id="homeTitle" className={styles.title}>
            CapyCode
          </h1>
          <p className={styles.subtitle}>
            CapyCode is the best platform to help you enhance your skills, expand your knowledge and
            prepare for technical interviews.
          </p>
          <Link to="/problemset">
            <Button text="Code Now!" className={styles.button} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
