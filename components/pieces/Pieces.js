"use client";

import styles from "./Pieces.module.css";
import { useRef } from "react";
import { useAppContext } from "../game/GameContext";
import { makeNewMove, clearCandidates } from "@/lib/state/actions/move";
import arbiter from "@/lib/chess/arbiter";
import { getNewMoveNotation } from "@/lib/chess/helper";
import Piece from "./Piece";

const Pieces = () => {
  const { appState, dispatch } = useAppContext();
  const currentPosition = appState.position[appState.position.length - 1];
  const ref = useRef();

  const calculateCoords = (e) => {
    const { top, left, width } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);
    return { x, y };
  };

  const move = (e) => {
    const { x, y } = calculateCoords(e);
    const [piece, rank, file] = e.dataTransfer.getData("text").split(",");

    if (appState.candidateMoves.some(([mx, my]) => mx === x && my === y)) {
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank: Number(rank),
        file: Number(file),
        x,
        y,
      });
      const newMove = getNewMoveNotation({ piece, rank, file, x, y, position: currentPosition });
      dispatch(makeNewMove({ newPosition, newMove }));
    }
    dispatch(clearCandidates());
  };

  const onDrop = (e) => {
    e.preventDefault();
    move(e);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.pieces} ref={ref} onDrop={onDrop} onDragOver={onDragOver}>
      {currentPosition.map((row, rank) =>
        row.map((piece, file) =>
          piece ? <Piece key={`${rank}-${file}`} rank={rank} file={file} piece={piece} /> : null
        )
      )}
    </div>
  );
};

export default Pieces;
