"use client";

import styles from "./Pieces.module.css";
import { useRef } from "react";
import { useAppContext } from "../game/GameContext";
import { makeNewMove, clearCandidates } from "@/lib/state/actions/move";
import { openPromotion } from "@/lib/state/actions/popup";
import { updateCastling } from "@/lib/state/actions/game";
import { rollDice } from "@/lib/state/actions/dice";
import { detectGameEnd } from "@/lib/state/detectGameEnd";
import arbiter from "@/lib/chess/arbiter";
import { getCastlingDirections } from "@/lib/chess/getMoves";
import { getNewMoveNotation } from "@/lib/chess/helper";
import { rollTwoDice, willPassTurn } from "@/lib/chess/diceRules";
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
    const raw = e.dataTransfer.getData("text/plain") || e.dataTransfer.getData("text");
    const [piece, rankStr, fileStr] = raw.split(",");
    const rank = Number(rankStr);
    const file = Number(fileStr);

    if (appState.candidateMoves.some(([mx, my]) => mx === x && my === y)) {
      if ((piece === "wp" && x === 7) || (piece === "bp" && x === 0)) {
        dispatch(openPromotion({ piece, rank, file, x, y }));
      } else {
        if (piece.endsWith("r") || piece.endsWith("k")) {
          const direction = getCastlingDirections({
            castleDirection: appState.castleDirection,
            piece,
            file,
            rank,
          });
          if (direction) dispatch(updateCastling(piece[0], direction));
        }

        const newPosition = arbiter.performMove({ position: currentPosition, piece, rank, file, x, y });
        const newMove = getNewMoveNotation({ piece, rank, file, x, y, position: currentPosition });
        dispatch(makeNewMove({ newPosition, newMove }));

        const opponent = piece[0] === "w" ? "b" : "w";
        const gameEnded = detectGameEnd({
          dispatch,
          newPosition,
          mover: piece[0],
          opponent,
          castleDirection: appState.castleDirection[opponent],
        });

        if (!gameEnded && willPassTurn(appState.dice)) {
          dispatch(rollDice(rollTwoDice()));
        }
      }
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
