"use client";

import { useEffect } from "react";
import { useAppContext } from "../game/GameContext";
import { rollDice, rerollDice } from "@/lib/state/actions/dice";
import { rollTwoDice } from "@/lib/chess/diceRules";
import { Status } from "@/lib/state/constants";

const PIECE_NAMES = { p: "Pawn", n: "Knight", b: "Bishop", r: "Rook", q: "Queen", k: "King" };
const VALUE_TO_GLYPH = { 1: "bp", 2: "bn", 3: "bb", 4: "br", 5: "bq", 6: "bk" };

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
    ? "Open Orders — move anything"
    : dice.isDoubles
      ? `Double Command · ${PIECE_NAMES[dice.orderedTypes[0]]} ×2`
      : dice.orderedTypes.map((t) => PIECE_NAMES[t]).join(" & ");

  return (
    <div className="flex w-64 flex-col items-center gap-3 rounded-2xl border border-brass/20 bg-felt-dark/70 p-4 text-ivory shadow-lg">
      <p className="font-display text-sm tracking-wide text-ivory/70">
        {turn === "w" ? "White" : "Black"} to move
      </p>

      {/* Keying on the roll remounts the dice on every new roll, which
          restarts the CSS shake animation without any effect/setState. */}
      <div key={dice.values.join(",")} className="flex gap-3">
        {dice.values.map((v, i) => (
          <div
            key={i}
            className={`relative h-16 w-16 animate-dice-shake rounded-xl bg-ivory bg-[length:70%] bg-center bg-no-repeat shadow-inner ${
              dice.isDoubles ? "ring-2 ring-brass" : ""
            }`}
            style={{ backgroundImage: `url(/pieces/${VALUE_TO_GLYPH[v]}.png)` }}
          >
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-espresso text-xs font-bold text-ivory">
              {v}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-sm font-medium text-brass">{orderedLabel}</p>

      <button
        onClick={onReroll}
        disabled={dice.rerollUsed || status !== Status.ongoing}
        className="rounded-lg bg-brass px-4 py-1.5 text-sm font-semibold text-espresso transition hover:bg-brass/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {dice.rerollUsed ? "Reroll used" : "Reroll"}
      </button>
    </div>
  );
};

export default DiceTray;
