import arbiter from "./arbiter";
import { getPieces } from "./getMoves";

const DIE_FACE_TO_PIECE_TYPE = { 1: "p", 2: "n", 3: "b", 4: "r", 5: "q", 6: "k" };

export const ALL_PIECE_TYPES = Object.values(DIE_FACE_TO_PIECE_TYPE);

export const diceValuesToPieceTypes = (values) => [
  ...new Set(values.map((v) => DIE_FACE_TO_PIECE_TYPE[v])),
];

export const rollTwoDice = () => [
  1 + Math.floor(Math.random() * 6),
  1 + Math.floor(Math.random() * 6),
];

// Every one of `player`'s pieces whose type is in `orderedTypes` and that
// actually has a legal move right now. Drives both the pickable/halo state
// on the board and the "Open Orders" fallback check below.
export const getMovablePieces = ({ position, prevPosition, castleDirection, player, orderedTypes }) =>
  getPieces(position, player)
    .filter((p) => orderedTypes.includes(p.piece[1]))
    .map((p) => ({
      ...p,
      moves: arbiter.getValidMoves({ position, prevPosition, castleDirection, ...p }),
    }))
    .filter((p) => p.moves.length > 0);

// Doubles grant a second move of the same type before the turn passes.
export const willPassTurn = (dice) => !(dice.isDoubles && dice.doubleMovesUsed === 0);
