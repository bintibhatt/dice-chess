"use client";

import styles from "./PromotionBox.module.css";
import { useAppContext } from "../../game/GameContext";
import { makeNewMove, clearCandidates } from "@/lib/state/actions/move";
import { rollDice } from "@/lib/state/actions/dice";
import { detectGameEnd } from "@/lib/state/detectGameEnd";
import { copyPosition, getNewMoveNotation } from "@/lib/chess/helper";
import { rollTwoDice, willPassTurn } from "@/lib/chess/diceRules";

const options = ["q", "r", "b", "n"];

const PromotionBox = ({ onClosePopup }) => {
  const { appState, dispatch } = useAppContext();
  const { promotionSquare } = appState;

  if (!promotionSquare) return null;

  const { piece, rank, file, x, y } = promotionSquare;
  const color = piece[0];

  const getBoxPosition = () => {
    const style = {};
    style.top = x === 7 ? "-12.5%" : "97.5%";

    if (y <= 1) style.left = "0%";
    else if (y >= 5) style.right = "0%";
    else style.left = `${12.5 * y - 20}%`;

    return style;
  };

  const onSelect = (option) => {
    onClosePopup();

    const currentPosition = appState.position[appState.position.length - 1];
    const newPosition = copyPosition(currentPosition);
    newPosition[rank][file] = "";
    newPosition[x][y] = color + option;

    const newMove = getNewMoveNotation({
      piece,
      rank,
      file,
      x,
      y,
      position: currentPosition,
      promotesTo: option,
    });

    dispatch(clearCandidates());
    dispatch(makeNewMove({ newPosition, newMove }));

    const opponent = color === "w" ? "b" : "w";
    const gameEnded = detectGameEnd({
      dispatch,
      newPosition,
      mover: color,
      opponent,
      castleDirection: appState.castleDirection[opponent],
    });

    if (!gameEnded && willPassTurn(appState.dice)) {
      dispatch(rollDice(rollTwoDice()));
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.box} style={getBoxPosition()}>
        {options.map((option) => (
          <div
            key={option}
            className={styles.option}
            style={{ backgroundImage: `url(/pieces/${color}${option}.png)` }}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionBox;
