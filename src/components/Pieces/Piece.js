import React from "react";
import { useAppContext } from "../../contexts/Context";
import { generateCandidates } from "../../reducer/actions/move";
import arbiter from "../../arbiter/arbiter";

const Piece = ({ rank, file, piece }) => {
  const { appState, dispatch } = useAppContext();
  const { turn, castleDirection, position: currentPosition } = appState;

  const handleDragStart = (e) => {
    console.log("Drag started:", piece, rank, file); // Add console log statement
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    // setTimeout(() => {
    //   e.target.style.display = "none";
    // }, 0);

    if (turn === piece[0]) {
      const candidateMoves = arbiter.getValidMoves({
        position: currentPosition[currentPosition.length - 1],
        prevPosition: currentPosition[currentPosition.length - 2],
        castleDirection: castleDirection[turn],
        piece,
        file,
        rank,
      });
      dispatch(generateCandidates({ candidateMoves }));
    }
  };

  const handleDragEnd = (e) => {
    e.target.style.display = "block";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default behavior of the browser

    // Retrieve the coordinates of the drop location
    const { x, y } = calculateCoords(e); // Assuming calculateCoords returns x and y

    // Retrieve the piece data from the drag event
    const [pieceType, draggedRank, draggedFile] = e.dataTransfer
      .getData("text")
      .split(",");

    // Update the game state with the new position of the dropped piece
    dispatch({
      type: "MOVE_PIECE",
      payload: {
        pieceType,
        from: { rank: Number(draggedRank), file: Number(draggedFile) },
        to: { rank: y, file: x },
      },
    });
  };

  const calculateCoords = (e) => {
    const rect = e.target.getBoundingClientRect();
    const size = rect.width / 8; // Assuming the board is divided into 8x8 squares
    const x = Math.floor((e.clientX - rect.left) / size);
    const y = Math.floor((e.clientY - rect.top) / size);
    return { x, y };
  };

  return (
    <div
      className={`piece ${piece} p-${file}${rank}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  );
};

export default Piece;
