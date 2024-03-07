import React from "react";
import Dice from "./components/Dice";
import ChessBoard from "./components/Board";
import "./App.css";

const App = () => {
  return (
    <>
      <h1>Dice Chess </h1>
      <div className="app-main-div">
        <div className="dice-div">
          <Dice />
        </div>
        <br />
        <ChessBoard />
      </div>
    </>
  );
};

export default App;
