"use client";

import { useEffect } from "react";
import { useAppContext } from "../game/GameContext";
import { rollDice, rerollDice } from "@/lib/state/actions/dice";
import { rollTwoDice } from "@/lib/chess/diceRules";
import { Status } from "@/lib/state/constants";

const PIECE_NAMES = { p: "Pawn", n: "Knight", b: "Bishop", r: "Rook", q: "Queen", k: "King" };

const DiceTray = () => {
  const { appState, dispatch } = useAppContext();
  const { dice, turn, status } = appState;

  // Fires on mount, and again any time dice.values is reset to [] (a fresh
  // game) — auto-rolling is the whole point of "Marching Orders", there's
  // no manual trigger for the very first roll of a turn.
  useEffect(() => {
    if (dice.values.length === 0) {
      dispatch(rollDice(rollTwoDice()));
    }
  }, [dice.values.length, dispatch]);

  const onReroll = () => {
    if (dice.rerollUsed) return;
    dispatch(rerollDice(rollTwoDice()));
  };

  if (dice.values.length === 0) return null;

  const orderedLabel = dice.openOrders
    ? "Open Orders — no legal moves matched the roll, move anything"
    : dice.isDoubles
      ? `Double Command: move ${PIECE_NAMES[dice.orderedTypes[0]]} twice`
      : `Ordered: ${dice.orderedTypes.map((t) => PIECE_NAMES[t]).join(", ")}`;

  return (
    <div className="flex w-64 flex-col items-center gap-2 rounded-xl border border-brass/20 bg-felt-dark/60 p-4 text-ivory">
      <p className="text-sm text-ivory/60">{turn === "w" ? "White" : "Black"} to move</p>
      <div className="flex gap-2">
        {dice.values.map((v, i) => (
          <span
            key={i}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-ivory text-lg font-semibold text-espresso"
          >
            {v}
          </span>
        ))}
      </div>
      <p className="text-center text-sm text-ivory/80">{orderedLabel}</p>
      <button
        onClick={onReroll}
        disabled={dice.rerollUsed || status !== Status.ongoing}
        className="rounded-lg bg-brass px-3 py-1 text-sm font-medium text-espresso disabled:opacity-40"
      >
        {dice.rerollUsed ? "Reroll used" : "Reroll"}
      </button>
    </div>
  );
};

export default DiceTray;
