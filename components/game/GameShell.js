"use client";

import Board from "../board/Board";
import Controls from "../controls/Controls";
import MovesList from "../controls/MovesList";
import TakeBack from "../controls/TakeBack";
import DiceTray from "../dice/DiceTray";

export default function GameShell() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 md:flex-row md:items-start">
      <DiceTray />
      <Board />
      <Controls>
        <MovesList />
        <TakeBack />
      </Controls>
    </div>
  );
}
