import { Status } from "./constants";
import actionTypes from "./actionTypes";
import { diceValuesToPieceTypes } from "../chess/diceRules";

const rollToDiceState = (values, rerolled) => ({
  values,
  orderedTypes: diceValuesToPieceTypes(values),
  isDoubles: values[0] === values[1],
  doubleMovesUsed: 0,
  rerollUsed: rerolled,
  openOrders: false,
});

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
        position = position.slice(0, -1);
        movesList = movesList.slice(0, -1);
        diceHistory = diceHistory.slice(0, -1);
        turn = turn === "w" ? "b" : "w";
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
      const dice = rollToDiceState(action.payload.values, false);
      return {
        ...state,
        dice,
        diceHistory: [...state.diceHistory.slice(0, -1), dice],
      };
    }

    case actionTypes.REROLL_DICE: {
      const dice = rollToDiceState(action.payload.values, true);
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
