import actionTypes from "../actionTypes";

export const openPromotion = ({ piece, rank, file, x, y }) => ({
  type: actionTypes.PROMOTION_OPEN,
  payload: { piece, rank: Number(rank), file: Number(file), x, y },
});

export const closePopup = () => ({
  type: actionTypes.PROMOTION_CLOSE,
});
