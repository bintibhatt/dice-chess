"use client";

import styles from "./Board.module.css";
import { useAppContext } from "../game/GameContext";
import Ranks from "./Ranks";
import Files from "./Files";
import Pieces from "../pieces/Pieces";
import arbiter from "@/lib/chess/arbiter";
import { getKingPosition } from "@/lib/chess/getMoves";

const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const files = [1, 2, 3, 4, 5, 6, 7, 8];

const Board = () => {
  const { appState } = useAppContext();
  const position = appState.position[appState.position.length - 1];

  const checkedSquare = (() => {
    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      player: appState.turn,
    });
    return isInCheck ? getKingPosition(position, appState.turn) : null;
  })();

  const getTileClassName = (rank, file) => {
    const boardRank = rank - 1;
    const boardFile = file - 1;
    const classNames = [styles.tile];

    classNames.push((7 - rank + file) % 2 === 0 ? styles.tileDark : styles.tileLight);

    if (appState.candidateMoves?.some(([x, y]) => x === boardRank && y === boardFile)) {
      classNames.push(position[boardRank][boardFile] ? styles.attacking : styles.highlight);
    }

    if (checkedSquare && checkedSquare[0] === boardRank && checkedSquare[1] === boardFile) {
      classNames.push(styles.checked);
    }

    return classNames.join(" ");
  };

  return (
    <div className={styles.board}>
      <Ranks ranks={ranks} />

      <div className={styles.tiles}>
        {ranks.map((rank) =>
          files.map((file) => (
            <div key={`${file}${rank}`} className={getTileClassName(rank, file)} />
          ))
        )}
      </div>

      <Pieces />

      <Files files={files} />
    </div>
  );
};

export default Board;
