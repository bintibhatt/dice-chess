import arbiter from "./arbiter";

export const getRookMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i <= 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (position?.[x]?.[y] === undefined) break;
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      if (position[x][y].startsWith(us)) {
        break;
      }
      moves.push([x, y]);
    }
  });

  return moves;
};

export const getKnightMoves = ({ position, rank, file }) => {
  const moves = [];
  const enemy = position[rank][file].startsWith("w") ? "b" : "w";

  const candidates = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  candidates.forEach((c) => {
    const cell = position?.[rank + c[0]]?.[file + c[1]];
    if (cell !== undefined && (cell.startsWith(enemy) || cell === "")) {
      moves.push([rank + c[0], file + c[1]]);
    }
  });
  return moves;
};

export const getBishopMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i <= 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (position?.[x]?.[y] === undefined) break;
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      if (position[x][y].startsWith(us)) {
        break;
      }
      moves.push([x, y]);
    }
  });
  return moves;
};

export const getQueenMoves = ({ position, piece, rank, file }) => {
  return [
    ...getBishopMoves({ position, piece, rank, file }),
    ...getRookMoves({ position, piece, rank, file }),
  ];
};

export const getKingMoves = ({ position, piece, rank, file }) => {
  let moves = [];
  const us = piece[0];
  const direction = [
    [1, -1],
    [1, 0],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  direction.forEach((dir) => {
    const x = rank + dir[0];
    const y = file + dir[1];
    if (position?.[x]?.[y] !== undefined && !position[x][y].startsWith(us)) moves.push([x, y]);
  });
  return moves;
};

export const getPawnMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const dir = piece === "wp" ? 1 : -1;
  const startRank = piece === "wp" ? 1 : 6;

  // Move two tiles on first move
  if (rank === startRank) {
    if (position?.[rank + dir]?.[file] === "" && position?.[rank + dir + dir]?.[file] === "") {
      moves.push([rank + dir + dir, file]);
    }
  }

  // Move one tile
  if (!position?.[rank + dir]?.[file]) {
    moves.push([rank + dir, file]);
  }

  return moves;
};

export const getPawnCaptures = ({ position, prevPosition, piece, rank, file }) => {
  const moves = [];
  const dir = piece === "wp" ? 1 : -1;
  const enemy = piece[0] === "w" ? "b" : "w";

  // Capture enemy to left
  if (position?.[rank + dir]?.[file - 1] && position[rank + dir][file - 1].startsWith(enemy)) {
    moves.push([rank + dir, file - 1]);
  }

  // Capture enemy to right
  if (position?.[rank + dir]?.[file + 1] && position[rank + dir][file + 1].startsWith(enemy)) {
    moves.push([rank + dir, file + 1]);
  }

  // En passant: enemy pawn that double-stepped past us last move
  const enemyPawn = dir === 1 ? "bp" : "wp";
  const adjacentFiles = [file - 1, file + 1];
  if (prevPosition) {
    if ((dir === 1 && rank === 4) || (dir === -1 && rank === 3)) {
      adjacentFiles.forEach((f) => {
        if (
          position?.[rank]?.[f] === enemyPawn &&
          position?.[rank + dir + dir]?.[f] === "" &&
          prevPosition?.[rank]?.[f] === "" &&
          prevPosition?.[rank + dir + dir]?.[f] === enemyPawn
        ) {
          moves.push([rank + dir, f]);
        }
      });
    }
  }

  return moves;
};

export const getCastlingMoves = ({ position, castleDirection, piece, rank, file }) => {
  const moves = [];

  if (file !== 4 || rank % 7 !== 0 || castleDirection === "none") {
    return moves;
  }

  const us = piece[0];
  const rookRank = us === "w" ? 0 : 7;
  const rook = us === "w" ? "wr" : "br";

  if (arbiter.isPlayerInCheck({ positionAfterMove: position, player: us })) return moves;

  if (
    ["left", "both"].includes(castleDirection) &&
    !position[rookRank][3] &&
    !position[rookRank][2] &&
    !position[rookRank][1] &&
    position[rookRank][0] === rook &&
    !arbiter.isPlayerInCheck({
      positionAfterMove: arbiter.performMove({ position, piece, rank, file, x: rookRank, y: 3 }),
      player: us,
    }) &&
    !arbiter.isPlayerInCheck({
      positionAfterMove: arbiter.performMove({ position, piece, rank, file, x: rookRank, y: 2 }),
      player: us,
    })
  ) {
    moves.push([rookRank, 2]);
  }

  if (
    ["right", "both"].includes(castleDirection) &&
    !position[rookRank][5] &&
    !position[rookRank][6] &&
    position[rookRank][7] === rook &&
    !arbiter.isPlayerInCheck({
      positionAfterMove: arbiter.performMove({ position, piece, rank, file, x: rookRank, y: 5 }),
      player: us,
    }) &&
    !arbiter.isPlayerInCheck({
      positionAfterMove: arbiter.performMove({ position, piece, rank, file, x: rookRank, y: 6 }),
      player: us,
    })
  ) {
    moves.push([rookRank, 6]);
  }

  return moves;
};

export const getCastlingDirections = ({ castleDirection, piece, file, rank }) => {
  file = Number(file);
  rank = Number(rank);
  const direction = castleDirection[piece[0]];
  if (piece.endsWith("k")) return "none";

  if (file === 0 && rank === 0) {
    if (direction === "both") return "right";
    if (direction === "left") return "none";
  }
  if (file === 7 && rank === 0) {
    if (direction === "both") return "left";
    if (direction === "right") return "none";
  }
  if (file === 0 && rank === 7) {
    if (direction === "both") return "right";
    if (direction === "left") return "none";
  }
  if (file === 7 && rank === 7) {
    if (direction === "both") return "left";
    if (direction === "right") return "none";
  }
};

export const getPieces = (position, color) => {
  const pieces = [];
  position.forEach((rank, x) => {
    rank.forEach((_file, y) => {
      if (position[x][y].startsWith(color))
        pieces.push({
          piece: position[x][y],
          rank: x,
          file: y,
        });
    });
  });
  return pieces;
};

export const getKingPosition = (position, player) => {
  let kingPos;
  position.forEach((rank, x) => {
    rank.forEach((_file, y) => {
      if (position[x][y].startsWith(player) && position[x][y].endsWith("k")) kingPos = [x, y];
    });
  });
  return kingPos;
};
