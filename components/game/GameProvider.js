"use client";

import { useReducer } from "react";
import { reducer } from "@/lib/state/reducer";
import { initGameState } from "@/lib/state/constants";
import GameContext from "./GameContext";

export default function GameProvider({ children }) {
  const [appState, dispatch] = useReducer(reducer, initGameState);

  return <GameContext.Provider value={{ appState, dispatch }}>{children}</GameContext.Provider>;
}
