"use client";

import Board from "../board/Board";

export default function GameShell() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Board />
    </div>
  );
}
