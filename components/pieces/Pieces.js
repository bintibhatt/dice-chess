"use client";

import styles from "./Pieces.module.css";
import { useAppContext } from "../game/GameContext";
import Piece from "./Piece";

const Pieces = () => {
  const { appState } = useAppContext();
  const currentPosition = appState.position[appState.position.length - 1];

  return (
    <div className={styles.pieces}>
      {currentPosition.map((row, rank) =>
        row.map((piece, file) =>
          piece ? <Piece key={`${rank}-${file}`} rank={rank} file={file} piece={piece} /> : null
        )
      )}
    </div>
  );
};

export default Pieces;
