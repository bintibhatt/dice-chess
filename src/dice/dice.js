import React, { useState } from "react";
import "./dice.css";
import pawnImage from "../assets/bp.png";
import knightImage from "../assets/bn.png";
import bishopImage from "../assets/bb.png";
import rookImage from "../assets/br.png";
import queenImage from "../assets/bq.png";
import kingImage from "../assets/bk.png";

const Dice = ({ onRoll, disabled }) => {
  const [rolling, setRolling] = useState(false);
  const [currentDiceValues, setCurrentDiceValues] = useState([1, 1, 1]);

  const rollDice = () => {
    if (rolling || disabled) return; // Prevent multiple rolls while already rolling or when disabled
    setRolling(true);
    animateRoll();
  };

  const animateRoll = () => {
    const animationDuration = 3000; // milliseconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = elapsedTime / animationDuration;

      if (progress >= 1) {
        // Animation complete
        setRolling(false);
        const newValues = Array.from(
          { length: 3 },
          () => Math.floor(Math.random() * 6) + 1
        );
        setCurrentDiceValues(newValues);
        localStorage.setItem("dice", newValues);
        onRoll(newValues);
        return;
      }

      // Perform rolling animation
      const newValues = Array.from(
        { length: 3 },
        () => Math.floor(Math.random() * 6) + 1
      );
      setCurrentDiceValues(newValues);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const imageStyle = {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  };

  const mapDiceValueToPiece = (value) => {
    switch (value) {
      case 1:
        return <img src={pawnImage} alt="pawn" style={imageStyle} />;
      case 2:
        return <img src={knightImage} alt="knight" style={imageStyle} />;
      case 3:
        return <img src={bishopImage} alt="bishop" style={imageStyle} />;
      case 4:
        return <img src={rookImage} alt="rook" style={imageStyle} />;
      case 5:
        return <img src={queenImage} alt="queen" style={imageStyle} />;
      case 6:
        return <img src={kingImage} alt="king" style={imageStyle} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="dice-container">
        {currentDiceValues.map((value, index) => (
          <div key={index} className={`dice ${rolling ? "rolling" : ""}`}>
            <div className="face front">{mapDiceValueToPiece(value)}</div>
            <div className="face back">{mapDiceValueToPiece(value)}</div>
            <div className="face top">{mapDiceValueToPiece(value)}</div>
            <div className="face bottom">{mapDiceValueToPiece(value)}</div>
            <div className="face right">{mapDiceValueToPiece(value)}</div>
            <div className="face left">{mapDiceValueToPiece(value)}</div>
          </div>
        ))}
      </div>
      <div className="dice-rolling">
        <button onClick={rollDice} disabled={rolling || disabled}>
          {rolling ? "Rolling..." : "Roll Dice"}
        </button>
      </div>
    </div>
  );
};

export default Dice;
