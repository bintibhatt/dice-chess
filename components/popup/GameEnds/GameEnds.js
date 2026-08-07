"use client";

import { useAppContext } from "../../game/GameContext";
import { Status } from "@/lib/state/constants";
import { setupNewGame } from "@/lib/state/actions/game";

const GameEnds = () => {
  const {
    appState: { status },
    dispatch,
  } = useAppContext();

  if (status === Status.ongoing || status === Status.promoting) return null;

  const newGame = () => dispatch(setupNewGame());
  const isWin = status.endsWith("wins");

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60">
      <div className="rounded-2xl border border-brass/40 bg-espresso p-8 text-center text-ivory shadow-2xl">
        <h1 className="text-2xl font-semibold">{isWin ? status : "Draw"}</h1>
        {!isWin && <p className="mt-1 text-ivory/70">{status}</p>}
        <button
          onClick={newGame}
          className="mt-6 rounded-lg bg-brass px-6 py-2 font-semibold text-espresso hover:bg-brass/90"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameEnds;
