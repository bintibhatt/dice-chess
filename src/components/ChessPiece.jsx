import React from "react";

const ChessPiece = ({ type }) => {
  // Map piece types to their corresponding image URLs
  const pieceImages = {
    K: "../../public/images/white-king.png",
    Q: "../../public/images/white-queen.png",
    N: "../../public/images/white-knight.png",
    B: "../../public/images/white-bishop.png",
    R: "../../public/images/white-rook.png",
    P: "../../public/images/white-pawn.png",
  };

  // Render the piece image based on the type
  return <img src={pieceImages[type]} alt={type} className="chess-piece" />;
};

export default ChessPiece;
