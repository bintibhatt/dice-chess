import actionTypes from "../actionTypes";

export const makeNewMove = ({ newPosition, newMove }) => ({
  type: actionTypes.NEW_MOVE,
  payload: { newPosition, newMove },
});

export const clearCandidates = () => ({
  type: actionTypes.CLEAR_CANDIDATE_MOVES,
});

export const generateCandidates = ({ candidateMoves }) => ({
  type: actionTypes.GENERATE_CANDIDATE_MOVES,
  payload: { candidateMoves },
});

export const takeBack = () => ({
  type: actionTypes.TAKE_BACK,
});
