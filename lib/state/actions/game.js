import actionTypes from "../actionTypes";
import { initGameState } from "../constants";

export const updateCastling = (color, direction) => ({
  type: actionTypes.CAN_CASTLE,
  payload: { color, direction },
});

export const detectStalemate = () => ({
  type: actionTypes.STALEMATE,
});

export const detectInsufficientMaterial = () => ({
  type: actionTypes.INSUFFICIENT_MATERIAL,
});

export const detectCheckmate = (winner) => ({
  type: actionTypes.WIN,
  payload: winner,
});

export const setupNewGame = () => ({
  type: actionTypes.NEW_GAME,
  payload: initGameState,
});
