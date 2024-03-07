import React, { useState } from "react";
import "../styles/Dice.css";

const Dice = () => {
  const [diceValues, setDiceValues] = useState([1, 1, 1]);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);

    setTimeout(() => {
      const newValues = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      setDiceValues(newValues);
      setRolling(false);
    }, 1500); // Change the duration to speed up/slow down the rolling animation
  };

  const mapDiceValueToPiece = (value) => {
    switch (value) {
      case 1:
        return (
          <img src="/images/white-pawn.png" className="dice-img" alt="1" />
        );
      case 2:
        return (
          <img src="/images/white-knight.png" className="dice-img" alt="2" />
        );
      case 3:
        return (
          <img src="/images/white-bishop.png" className="dice-img" alt="3" />
        );
      case 4:
        return (
          <img src="/images/white-rook.png" className="dice-img" alt="4" />
        );
      case 5:
        return (
          <img src="/images/white-queen.png" className="dice-img" alt="5" />
        );
      case 6:
        return (
          <img src="/images/white-king.png" className="dice-img" alt="6" />
        );
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="dice-container">
        {diceValues.map((value, index) => (
          <div key={index} className={`dice ${rolling ? "rolling" : ""}`}>
            <div className="face front">{mapDiceValueToPiece(value)}</div>
            <div className="face back">{mapDiceValueToPiece(value)}</div>
            <div className="face right">{mapDiceValueToPiece(value)}</div>
            <div className="face left">{mapDiceValueToPiece(value)}</div>
            <div className="face top">{mapDiceValueToPiece(value)}</div>
            <div className="face bottom">{mapDiceValueToPiece(value)}</div>
          </div>
        ))}
      </div>
      <button onClick={rollDice} disabled={rolling}>
        Roll Dice
      </button>
    </div>
  );
};

export default Dice;
