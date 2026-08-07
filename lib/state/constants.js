import { createPosition } from "../chess/helper";

export const Status = {
  ongoing: "Ongoing",
  promoting: "Promoting",
  white: "White wins",
  black: "Black wins",
  stalemate: "Game draws due to stalemate",
  insufficient: "Game draws due to insufficient material",
};

// No roll yet — orderedTypes empty means "nothing pickable until the first roll".
const initialDice = {
  values: [],
  orderedTypes: [],
  isDoubles: false,
  doubleMovesUsed: 0,
  rerollUsed: false,
  openOrders: false,
};

export const initGameState = {
  position: [createPosition()],
  turn: "w",
  candidateMoves: [],
  movesList: [],

  promotionSquare: null,
  status: Status.ongoing,
  castleDirection: {
    w: "both",
    b: "both",
  },

  // Parallel to `position`/`movesList` so TAKE_BACK can restore the exact
  // roll that was active for the position being reverted to.
  dice: initialDice,
  diceHistory: [initialDice],
};
