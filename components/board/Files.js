"use client";

import styles from "./Files.module.css";
import { getCharacter } from "@/lib/chess/helper";

const Files = ({ files }) => (
  <div className={styles.files}>
    {files.map((file) => (
      <span key={file}>{getCharacter(file)}</span>
    ))}
  </div>
);

export default Files;
