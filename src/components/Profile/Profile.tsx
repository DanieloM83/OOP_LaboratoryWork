"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import styles from "./Profile.module.css";
import BirdImage from "@/assets/images/BirdNewYear.jpg";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/user/slice";

// Web Worker for image resizing (Vite-compatible via new URL)
const ResizeWorker =
  typeof window !== "undefined"
    ? new Worker(new URL("@/worker/resize.worker.js", import.meta.url))
    : null;

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const username = user?.username ?? "nickname";

  const [avatar, setAvatar] = useState(BirdImage);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !ResizeWorker) return;

    ResizeWorker.postMessage(file);

    ResizeWorker.onmessage = (ev) => {
      const { blob, error } = ev.data || {};
      if (error) {
        console.error("Resize worker error:", error);
        return;
      }
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setAvatar(url);
    };
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    if (!ResizeWorker) return;

    const handleWorkerMessage = (ev: MessageEvent) => {
      const { blob, error } = ev.data || {};
      if (error) {
        console.error("Resize worker error:", error);
        return;
      }
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setAvatar(url);
    };

    ResizeWorker.addEventListener("message", handleWorkerMessage);

    // Cleanup = unsubscribe
    return () => {
      ResizeWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, []);

  return (
    <>
      <Header />

      <section className={styles.page} aria-labelledby="profileTitle">
        <div className={styles.card}>
          <div className={styles.headerRow}>
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              <img src={avatar} alt="User avatar" className={styles.avatar} />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFile}
              />
            </div>

            <div className={styles.headerContent}>
              <h1 id="profileTitle" className={styles.title}>
                Firstname Surname <span className={styles.flag}>🇺🇦</span>
              </h1>
              <p className={styles.handle}>@{username}</p>
              <div className={styles.meta}>
                <span>Last online: 15.12.2024</span>
                <span>Joined December, 2023</span>
              </div>
            </div>
          </div>

          <hr className={styles.separator} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Recent solutions:</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.index}>1.</span> Two Sum
              </li>
              <li className={styles.listItem}>
                <span className={styles.index}>3.</span> Longest Substring Without
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
