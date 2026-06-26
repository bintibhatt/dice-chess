import { useAppContext } from "../../contexts/Context";
import { generateCandidates } from "../../reducer/actions/move";
import arbiter from "../../arbiter/arbiter";

const Piece = ({ rank, file, piece }) => {
  const { appState, dispatch } = useAppContext();
  const { turn, castleDirection, position: currentPosition } = appState;

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);

    const { diceValues, diceRolled } = appState;
    const pieceType = piece[1];

    // Only generate candidate moves if it's this player's turn,
    // dice have been rolled, and the piece type matches a die result
    if (turn === piece[0] && diceRolled && diceValues.includes(pieceType)) {
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

  return (
    <div
      className={`piece ${piece} p-${file}${rank}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    />
  );
};

export default Piece;
