import { Status } from "./constants";
import actionTypes from "./actionTypes";
import { diceValuesToPieceTypes, ALL_PIECE_TYPES, getMovablePieces } from "../chess/diceRules";
import arbiter from "../chess/arbiter";

const rollToDiceState = (values, rerolled, state) => {
  let orderedTypes = diceValuesToPieceTypes(values);
  let openOrders = false;

  const position = state.position[state.position.length - 1];
  const prevPosition = state.position[state.position.length - 2];
  const castleDirection = state.castleDirection[state.turn];

  const movable = getMovablePieces({
    position,
    prevPosition,
    castleDirection,
    player: state.turn,
    orderedTypes,
  });

  // If nothing rolled can actually move, lift the restriction for this turn
  // only — but only when the player has SOME legal move; otherwise this is
  // real stalemate/checkmate, which dice never cause or hide.
  if (movable.length === 0) {
    const hasAnyLegalMove =
      arbiter.getAllValidMoves({ position, prevPosition, castleDirection, player: state.turn }).length > 0;
    if (hasAnyLegalMove) {
      orderedTypes = ALL_PIECE_TYPES;
      openOrders = true;
    }
  }

  return {
    values,
    orderedTypes,
    isDoubles: values[0] === values[1],
    doubleMovesUsed: 0,
    rerollUsed: rerolled,
    openOrders,
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { position, movesList, turn, dice, diceHistory } = state;
      position = [...position, action.payload.newPosition];
      movesList = [...movesList, action.payload.newMove];

      // Doubles grant a second move with the same ordered piece type before the turn passes.
      const consumingBonusMove = dice.isDoubles && dice.doubleMovesUsed === 0;
      if (consumingBonusMove) {
        dice = { ...dice, doubleMovesUsed: 1 };
      } else {
        turn = turn === "w" ? "b" : "w";
      }
      diceHistory = [...diceHistory, dice];

      return {
        ...state,
        position,
        movesList,
        turn,
        dice,
        diceHistory,
      };
    }

    case actionTypes.GENERATE_CANDIDATE_MOVES: {
      const { candidateMoves } = action.payload;
      return {
        ...state,
        candidateMoves,
      };
    }

    case actionTypes.CLEAR_CANDIDATE_MOVES: {
      return {
        ...state,
        candidateMoves: [],
      };
    }

    case actionTypes.PROMOTION_OPEN: {
      return {
        ...state,
        status: Status.promoting,
        promotionSquare: { ...action.payload },
      };
    }

    case actionTypes.PROMOTION_CLOSE: {
      return {
        ...state,
        status: Status.ongoing,
        promotionSquare: null,
      };
    }

    case actionTypes.CAN_CASTLE: {
      const { color, direction } = action.payload;
      return {
        ...state,
        castleDirection: { ...state.castleDirection, [color]: direction },
      };
    }

    case actionTypes.STALEMATE: {
      return {
        ...state,
        status: Status.stalemate,
      };
    }

    case actionTypes.INSUFFICIENT_MATERIAL: {
      return {
        ...state,
        status: Status.insufficient,
      };
    }

    case actionTypes.WIN: {
      return {
        ...state,
        status: action.payload === "w" ? Status.white : Status.black,
      };
    }

    case actionTypes.NEW_GAME: {
      return {
        ...action.payload,
      };
    }

    case actionTypes.TAKE_BACK: {
      let { position, movesList, turn, diceHistory } = state;
      if (position.length > 1) {
        const undoKeepsTurn = state.dice.isDoubles && state.dice.doubleMovesUsed === 1;
        position = position.slice(0, -1);
        movesList = movesList.slice(0, -1);
        diceHistory = diceHistory.slice(0, -1);
        if (!undoKeepsTurn) {
          turn = turn === "w" ? "b" : "w";
        }
      }

      return {
        ...state,
        position,
        movesList,
        turn,
        diceHistory,
        dice: diceHistory[diceHistory.length - 1],
      };
    }

    case actionTypes.ROLL_DICE: {
      const dice = rollToDiceState(action.payload.values, false, state);
      return {
        ...state,
        dice,
        diceHistory: [...state.diceHistory.slice(0, -1), dice],
      };
    }

    case actionTypes.REROLL_DICE: {
      const dice = rollToDiceState(action.payload.values, true, state);
      return {
        ...state,
        dice,
        diceHistory: [...state.diceHistory.slice(0, -1), dice],
      };
    }

    default:
      return state;
  }
};
