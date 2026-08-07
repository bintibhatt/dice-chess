"use client";

import Board from "../board/Board";
import Controls from "../controls/Controls";
import MovesList from "../controls/MovesList";
import TakeBack from "../controls/TakeBack";

export default function GameShell() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 md:flex-row md:items-start">
      <Board />
      <Controls>
        <MovesList />
        <TakeBack />
      </Controls>
    </div>
  );
}
