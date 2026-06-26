import "./Pieces.css";
import Piece from "./Piece";
import { useRef } from "react";
import { useAppContext } from "../../contexts/Context";
import { openPromotion } from "../../reducer/actions/popup";
import { getCastlingDirections } from "../../arbiter/getMoves";
import {
  updateCastling,
  detectStalemate,
  detectInsufficientMaterial,
  detectCheckmate,
} from "../../reducer/actions/game";

import { makeNewMove, clearCandidates } from "../../reducer/actions/move";
import arbiter from "../../arbiter/arbiter";
import { getNewMoveNotation } from "../../helper";

const Pieces = () => {
  const { appState, dispatch } = useAppContext();
  const currentPosition = appState.position[appState.position.length - 1];

  const ref = useRef();

  const updateCastlingState = ({ piece, file, rank }) => {
    const direction = getCastlingDirections({
      castleDirection: appState.castleDirection,
      piece,
      file,
      rank,
    });
    if (direction) {
      dispatch(updateCastling(direction));
    }
  };

  const openPromotionBox = ({ rank, file, x, y }) => {
    dispatch(
      openPromotion({
        rank: Number(rank),
        file: Number(file),
        x,
        y,
      })
    );
  };

  const calculateCoords = (e) => {
    const { top, left, width } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);

    return { x, y };
  };

  const move = (e) => {
    const { x, y } = calculateCoords(e);
    const [piece, rawRank, rawFile] = e.dataTransfer.getData("text").split(",");
    const rank = Number(rawRank);
    const file = Number(rawFile);

    if (appState.candidateMoves.find((m) => m[0] === x && m[1] === y)) {
      const opponent = piece.startsWith("b") ? "w" : "b";
      const castleDirection = appState.castleDirection[opponent];

      if ((piece === "wp" && x === 7) || (piece === "bp" && x === 0)) {
        openPromotionBox({ rank, file, x, y });
        return;
      }
      if (piece.endsWith("r") || piece.endsWith("k")) {
        updateCastlingState({ piece, file, rank });
      }
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank,
        file,
        x,
        y,
      });
      const newMove = getNewMoveNotation({
        piece,
        rank,
        file,
        x,
        y,
        position: currentPosition,
      });
      dispatch(makeNewMove({ newPosition, newMove }));

      if (arbiter.insufficientMaterial(newPosition))
        dispatch(detectInsufficientMaterial());
      else if (arbiter.isStalemate(newPosition, opponent, castleDirection)) {
        dispatch(detectStalemate());
      } else if (arbiter.isCheckMate(newPosition, opponent, castleDirection)) {
        dispatch(detectCheckmate(piece[0]));
      }
    }
    dispatch(clearCandidates());
  };

  const onDrop = (e) => {
    e.preventDefault();

    const { diceValues, diceRolled } = appState;

    // Must roll dice before making a move
    if (!diceRolled || diceValues.length === 0) {
      return;
    }

    const pieceType = e.dataTransfer.getData("text").split(",")[0][1];
    if (diceValues.includes(pieceType)) {
      move(e);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pieces" ref={ref} onDrop={onDrop} onDragOver={onDragOver}>
      {currentPosition.map((r, rank) =>
        r.map((f, file) =>
          currentPosition[rank][file] ? (
            <Piece
              key={rank + "-" + file}
              rank={rank}
              file={file}
              piece={currentPosition[rank][file]}
            />
          ) : null
        )
      )}
    </div>
  );
};

export default Pieces;
