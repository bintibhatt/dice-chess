import "./App.css";
import Board from "./components/Board/Board";
import { reducer } from "./reducer/reducer";
import { useReducer } from "react";
import { initGameState } from "./constants";
import AppContext from "./contexts/Context";
import Control from "./components/Control/Control";
import TakeBack from "./components/Control/bits/TakeBack";
import MovesList from "./components/Control/bits/MovesList";
import Dice from "./dice/dice";

function App() {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  const handleRoll = (values) => {
    console.log("Dice values rolled:", values);
    // Here you can handle the rolled dice values, update game state, etc.
  };

  const providerState = {
    appState,
    dispatch,
  };

  return (
    <AppContext.Provider value={providerState}>
      <div className="main_app">
        <div>
          <p>Dice Chess </p>
          <Dice onRoll={handleRoll} /> {/* Pass the handleRoll function */}
        </div>
        <div className="App">
          <Control>
            <MovesList />
            <TakeBack />
          </Control>
          <Board />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
