import React, { useState } from "react";
import "../styles/ChessBoard.css"; // You can add your own styling for the Chess board

const ChessBoard = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState("white"); // Initialize with white's turn
  const [selectedSquare, setSelectedSquare] = useState(null);

  // Function to initialize the Chess board with pieces
  function initializeBoard() {
    const rows = [];
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        // Initial positions of pieces on the board
        if (i === 0 && (j === 1 || j === 6)) {
          row.push({ piece: "♞", color: "black", id: `${i}-${j}` }); // Black knights
        } else if (i === 7 && (j === 1 || j === 6)) {
          row.push({ piece: "♘", color: "white", id: `${i}-${j}` }); // White knights
        } else if (i === 0 && (j === 0 || j === 7)) {
          row.push({ piece: "♜", color: "black", id: `${i}-${j}` }); // Black rooks
        } else if (i === 7 && (j === 0 || j === 7)) {
          row.push({ piece: "♖", color: "white", id: `${i}-${j}` }); // White rooks
        } else if (i === 0 && (j === 2 || j === 5)) {
          row.push({ piece: "♝", color: "black", id: `${i}-${j}` }); // Black bishops
        } else if (i === 7 && (j === 2 || j === 5)) {
          row.push({ piece: "♗", color: "white", id: `${i}-${j}` }); // White bishops
        } else if (i === 0 && j === 3) {
          row.push({ piece: "♛", color: "black", id: `${i}-${j}` }); // Black queen
        } else if (i === 7 && j === 3) {
          row.push({ piece: "♕", color: "white", id: `${i}-${j}` }); // White queen
        } else if (i === 0 && j === 4) {
          row.push({ piece: "♚", color: "black", id: `${i}-${j}` }); // Black king
        } else if (i === 7 && j === 4) {
          row.push({ piece: "♔", color: "white", id: `${i}-${j}` }); // White king
        } else if (i === 1) {
          row.push({ piece: "♟", color: "black", id: `${i}-${j}` }); // Black pawns
        } else if (i === 6) {
          row.push({ piece: "♙", color: "white", id: `${i}-${j}` }); // White pawns
        } else {
          row.push(null);
        }
      }
      rows.push(row);
    }
    return rows;
  }

  // Function to handle the drag start event
  const handleDragStart = (e, piece) => {
    // Check if it's the current player's turn and the piece belongs to the current player
    if (piece.color === currentPlayer) {
      setSelectedSquare({
        piece,
        row: parseInt(e.target.dataset.row),
        col: parseInt(e.target.dataset.col),
      });
    } else {
      e.preventDefault(); // Prevent drag if it's not the current player's turn or if it's not the player's own piece
    }
  };

  // Function to handle the drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle the drop event
  const handleDrop = (e, targetRow, targetCol) => {
    e.preventDefault();
    if (!selectedSquare) return;

    const { piece, row, col } = selectedSquare;
    const validMove = validateMove(row, col, targetRow, targetCol, piece);
    if (validMove) {
      movePiece(row, col, targetRow, targetCol);
    }
    setSelectedSquare(null);
  };

  // Function to validate rook move
  const validateRookMove = (
    sourceRow,
    sourceCol,
    targetRow,
    targetCol,
    piece,
  ) => {
    // Check if the target square is within the board's bounds
    if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
      return false;
    }

    // Rook move validation
    if (sourceRow === targetRow || sourceCol === targetCol) {
      const isVerticalMove = sourceCol === targetCol;
      const step = isVerticalMove
        ? sourceRow < targetRow
          ? 1
          : -1
        : sourceCol < targetCol
          ? 1
          : -1;
      let row = isVerticalMove ? sourceRow + step : sourceRow;
      let col = isVerticalMove ? sourceCol : sourceCol + step;
      while (row !== targetRow || col !== targetCol) {
        if (board[row][col]) {
          return false; // There's a piece blocking the rook's path
        }
        if (isVerticalMove) {
          row += step;
        } else {
          col += step;
        }
      }
      // Check if the target square is empty or contains an opponent's piece
      return (
        !board[targetRow][targetCol] ||
        board[targetRow][targetCol].color !== piece.color
      );
    }
    return false; // Invalid move for the rook
  };

  // Function to validate bishop move
  const validateBishopMove = (
    sourceRow,
    sourceCol,
    targetRow,
    targetCol,
    piece,
  ) => {
    // Check if the target square is within the board's bounds
    if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
      return false;
    }

    // Bishop move validation
    if (Math.abs(targetRow - sourceRow) === Math.abs(targetCol - sourceCol)) {
      const stepRow = targetRow > sourceRow ? 1 : -1;
      const stepCol = targetCol > sourceCol ? 1 : -1;
      let row = sourceRow + stepRow;
      let col = sourceCol + stepCol;
      while (row !== targetRow || col !== targetCol) {
        if (board[row][col] && (row !== targetRow || col !== targetCol)) {
          return false; // There's a piece blocking the bishop's path
        }
        row += stepRow;
        col += stepCol;
      }
      // Check if the target square is empty or contains an opponent's piece
      return (
        !board[targetRow][targetCol] ||
        board[targetRow][targetCol].color !== piece.color
      );
    }
    return false; // Invalid move for the bishop
  };

  // Function to validate queen move
  const validateQueenMove = (
    sourceRow,
    sourceCol,
    targetRow,
    targetCol,
    piece,
  ) => {
    // Validate queen move as a rook
    const isRookMoveValid = validateRookMove(
      sourceRow,
      sourceCol,
      targetRow,
      targetCol,
      piece,
    );

    // Validate queen move as a bishop
    const isBishopMoveValid = validateBishopMove(
      sourceRow,
      sourceCol,
      targetRow,
      targetCol,
      piece,
    );

    // Queen can move if the move is valid for either a rook or a bishop
    return isRookMoveValid || isBishopMoveValid;
  };

  // Function to validate knight move
  const validateKnightMove = (
    sourceRow,
    sourceCol,
    targetRow,
    targetCol,
    piece,
  ) => {
    // Check if the target square is within the board's bounds
    if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
      return false;
    }

    // Knight move validation
    const rowDiff = Math.abs(targetRow - sourceRow);
    const colDiff = Math.abs(targetCol - sourceCol);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  };

  // Function to validate pawn move
  const validatePawnMove = (
    sourceRow,
    sourceCol,
    targetRow,
    targetCol,
    piece,
  ) => {
    // Check if the target square is within the board's bounds
    if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
      return false;
    }

    // Pawn move validation
    if (piece.piece === "♙") {
      // White pawns move one square forward
      if (
        sourceCol === targetCol &&
        targetRow === sourceRow - 1 &&
        !board[targetRow][targetCol]
      ) {
        return true;
      }
      // White pawns move two squares forward from initial position
      if (
        sourceCol === targetCol &&
        targetRow === sourceRow - 2 &&
        sourceRow === 6 &&
        !board[sourceRow - 1][targetCol] &&
        !board[targetRow][targetCol]
      ) {
        return true;
      }
      // White pawns capture diagonally
      if (
        (targetCol === sourceCol - 1 || targetCol === sourceCol + 1) &&
        targetRow === sourceRow - 1 &&
        board[targetRow][targetCol] &&
        board[targetRow][targetCol].color === "black"
      ) {
        return true;
      }
      return false;
    }
    if (piece.piece === "♟") {
      // Black pawns move one square forward
      if (
        sourceCol === targetCol &&
        targetRow === sourceRow + 1 &&
        !board[targetRow][targetCol]
      ) {
        return true;
      }
      // Black pawns move two squares forward from initial position
      if (
        sourceCol === targetCol &&
        targetRow === sourceRow + 2 &&
        sourceRow === 1 &&
        !board[sourceRow + 1][targetCol] &&
        !board[targetRow][targetCol]
      ) {
        return true;
      }
      // Black pawns capture diagonally
      if (
        (targetCol === sourceCol - 1 || targetCol === sourceCol + 1) &&
        targetRow === sourceRow + 1 &&
        board[targetRow][targetCol] &&
        board[targetRow][targetCol].color === "white"
      ) {
        return true;
      }
      return false;
    }
  };

  // Function to validate moves for all pieces
  const validateMove = (sourceRow, sourceCol, targetRow, targetCol, piece) => {
    if (piece.piece === "♜" || piece.piece === "♖") {
      return validateRookMove(
        sourceRow,
        sourceCol,
        targetRow,
        targetCol,
        piece,
      );
    } else if (piece.piece === "♝" || piece.piece === "♗") {
      return validateBishopMove(
        sourceRow,
        sourceCol,
        targetRow,
        targetCol,
        piece,
      );
    } else if (piece.piece === "♞" || piece.piece === "♘") {
      return validateKnightMove(
        sourceRow,
        sourceCol,
        targetRow,
        targetCol,
        piece,
      );
    } else if (piece.piece === "♛" || piece.piece === "♕") {
      return validateQueenMove(
        sourceRow,
        sourceCol,
        targetRow,
        targetCol,
        piece,
      );
    } else if (piece.piece === "♙" || piece.piece === "♟") {
      return validatePawnMove(
        sourceRow,
        sourceCol,
        targetRow,
        targetCol,
        piece,
      );
    }
  };

  // Function to move the piece on the board
  const movePiece = (sourceRow, sourceCol, targetRow, targetCol) => {
    const newBoard = board.map((row, rowIndex) =>
      row.map((square, colIndex) => {
        if (rowIndex === targetRow && colIndex === targetCol) {
          return board[sourceRow][sourceCol]; // Move the piece to the target square
        } else if (rowIndex === sourceRow && colIndex === sourceCol) {
          return null; // Clear the original position of the piece
        } else {
          return square; // Leave other squares unchanged
        }
      }),
    );
    setBoard(newBoard);
    // Switch turns after successful move
    setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
  };

  // Function to render the Chess board
  const renderSquare = (row, col, piece) => {
    return (
      <div
        className={`square ${(row + col) % 2 === 0 ? "dark" : "light"}`}
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, row, col)}
      >
        {piece && (
          <div
            className={`piece ${piece.color}`}
            draggable
            onDragStart={(e) => handleDragStart(e, piece)}
            data-row={row}
            data-col={col}
          >
            {piece.piece}
          </div>
        )}
      </div>
    );
  };

  // Function to render the entire Chess board
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div className="board-row" key={rowIndex}>
        {row.map((square, colIndex) => (
          <div className="board-col" key={colIndex}>
            {renderSquare(rowIndex, colIndex, square)}
          </div>
        ))}
      </div>
    ));
  };

  return <div className="chessboard">{renderBoard()}</div>;
};

export default ChessBoard;
