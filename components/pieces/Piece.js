"use client";

import styles from "./Pieces.module.css";
import { useAppContext } from "../game/GameContext";
import { generateCandidates } from "@/lib/state/actions/move";
import arbiter from "@/lib/chess/arbiter";

const Piece = ({ rank, file, piece }) => {
  const { appState, dispatch } = useAppContext();
  const { turn, castleDirection, position: positionHistory } = appState;

  const canDrag = turn === piece[0];

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);

    const candidateMoves = arbiter.getValidMoves({
      position: positionHistory[positionHistory.length - 1],
      prevPosition: positionHistory[positionHistory.length - 2],
      castleDirection: castleDirection[turn],
      piece,
      rank,
      file,
    });
    dispatch(generateCandidates({ candidateMoves }));
  };

  return (
    <div
      className={styles.piece}
      style={{
        "--file": file,
        "--rank": rank,
        backgroundImage: `url(/pieces/${piece}.png)`,
      }}
      draggable={canDrag}
      onDragStart={handleDragStart}
    />
  );
};

export default Piece;
