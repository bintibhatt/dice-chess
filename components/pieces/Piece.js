"use client";

import styles from "./Pieces.module.css";

const Piece = ({ rank, file, piece }) => {
  return (
    <div
      className={styles.piece}
      style={{
        "--file": file,
        "--rank": rank,
        backgroundImage: `url(/pieces/${piece}.png)`,
      }}
    />
  );
};

export default Piece;
