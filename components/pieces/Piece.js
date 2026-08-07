"use client";

import { useMemo } from "react";
import styles from "./Pieces.module.css";
import { useAppContext } from "../game/GameContext";
import { generateCandidates } from "@/lib/state/actions/move";
import arbiter from "@/lib/chess/arbiter";

const Piece = ({ rank, file, piece }) => {
  const { appState, dispatch } = useAppContext();
  const { turn, castleDirection, dice, position: positionHistory } = appState;

  const isMovable = turn === piece[0] && dice.orderedTypes.includes(piece[1]);

  const candidateMoves = useMemo(() => {
    if (!isMovable) return [];
    return arbiter.getValidMoves({
      position: positionHistory[positionHistory.length - 1],
      prevPosition: positionHistory[positionHistory.length - 2],
      castleDirection: castleDirection[turn],
      piece,
      rank,
      file,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMovable, positionHistory, castleDirection, turn, piece, rank, file]);

  const canDrag = candidateMoves.length > 0;

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    dispatch(generateCandidates({ candidateMoves }));
  };

  return (
    <div
      className={styles.piece}
      style={{
        "--file": file,
        "--rank": rank,
        backgroundImage: `url(/pieces/${piece}.png)`,
        opacity: turn === piece[0] && !canDrag ? 0.4 : 1,
        cursor: canDrag ? "grab" : "default",
      }}
      draggable={canDrag}
      onDragStart={handleDragStart}
    />
  );
};

export default Piece;
