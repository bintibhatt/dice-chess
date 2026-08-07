import actionTypes from "../actionTypes";

export const rollDice = (values) => ({
  type: actionTypes.ROLL_DICE,
  payload: { values },
});

export const rerollDice = (values) => ({
  type: actionTypes.REROLL_DICE,
  payload: { values },
});
