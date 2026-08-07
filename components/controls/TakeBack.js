"use client";

import { useAppContext } from "../game/GameContext";
import { takeBack } from "@/lib/state/actions/move";

const TakeBack = () => {
  const { dispatch } = useAppContext();

  return (
    <button
      onClick={() => dispatch(takeBack())}
      className="rounded-lg bg-brass px-4 py-2 font-medium text-espresso hover:bg-brass/90"
    >
      Undo
    </button>
  );
};

export default TakeBack;
