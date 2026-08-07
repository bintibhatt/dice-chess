"use client";

import { useAppContext } from "./GameContext";
import { setupNewGame } from "@/lib/state/actions/game";

const Header = () => {
  const { dispatch } = useAppContext();

  return (
    <header className="flex w-full items-center justify-between border-b border-brass/20 bg-espresso/40 px-6 py-3">
      <h1 className="font-display text-lg font-semibold tracking-wide text-brass">Dice Chess</h1>
      <button
        onClick={() => dispatch(setupNewGame())}
        className="rounded-lg border border-brass/40 px-3 py-1 text-sm font-medium text-ivory/80 transition hover:border-brass hover:text-brass"
      >
        New Game
      </button>
    </header>
  );
};

export default Header;
