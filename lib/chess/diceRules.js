const DIE_FACE_TO_PIECE_TYPE = { 1: "p", 2: "n", 3: "b", 4: "r", 5: "q", 6: "k" };

export const ALL_PIECE_TYPES = Object.values(DIE_FACE_TO_PIECE_TYPE);

export const diceValuesToPieceTypes = (values) => [
  ...new Set(values.map((v) => DIE_FACE_TO_PIECE_TYPE[v])),
];
