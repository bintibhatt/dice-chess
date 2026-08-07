import arbiter from "../chess/arbiter";
import { detectInsufficientMaterial, detectStalemate, detectCheckmate } from "./actions/game";

// Runs after any completed move: checks the resulting position for a
// game-ending condition, dice-blind — "legal move" for these checks always
// means the full standard-chess legal-move set, never the dice-restricted
// subset (see the "Marching Orders" dice rule). Returns whether the game
// ended, so callers know whether it's still worth rolling fresh dice.
export const detectGameEnd = ({ dispatch, newPosition, mover, opponent, castleDirection }) => {
  if (arbiter.insufficientMaterial(newPosition)) {
    dispatch(detectInsufficientMaterial());
    return true;
  }
  if (arbiter.isStalemate(newPosition, opponent, castleDirection)) {
    dispatch(detectStalemate());
    return true;
  }
  if (arbiter.isCheckMate(newPosition, opponent, castleDirection)) {
    dispatch(detectCheckmate(mover));
    return true;
  }
  return false;
};
