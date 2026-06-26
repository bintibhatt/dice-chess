import actionTypes from "../actionTypes";
import { DICE_TO_PIECE } from "../../constants";

export const setDiceValues = (rawValues) => {
  const pieceLetters = rawValues.map((v) => DICE_TO_PIECE[v]);
  return {
    type: actionTypes.SET_DICE_VALUES,
    payload: pieceLetters,
  };
};
