"use client";

import { createContext, useContext } from "react";

const GameContext = createContext();

export function useAppContext() {
  return useContext(GameContext);
}

export default GameContext;
