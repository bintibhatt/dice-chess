"use client";

import { useAppContext } from "../game/GameContext";

const MovesList = () => {
  const {
    appState: { movesList },
  } = useAppContext();

  const rows = [];
  for (let i = 0; i < movesList.length; i += 2) {
    rows.push({ number: i / 2 + 1, white: movesList[i], black: movesList[i + 1] });
  }

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-brass/20 bg-felt-dark/70 p-4 text-ivory shadow-lg">
      <h2 className="font-display text-base font-semibold text-brass">Move History</h2>
      <div className="h-px bg-brass/30" />
      <div className="max-h-72 overflow-y-auto">
        {rows.length === 0 ? (
          <p className="py-4 text-center text-sm text-ivory/50">No moves yet — roll to begin.</p>
        ) : (
          rows.map((row, i) => (
            <div
              key={row.number}
              className={`grid grid-cols-[2rem_1fr_1fr] gap-2 rounded px-1 py-1 text-sm ${
                i === rows.length - 1 ? "border-l-2 border-brass bg-brass/10" : ""
              }`}
            >
              <span className="text-ivory/50">{row.number}.</span>
              <span>{row.white}</span>
              <span>{row.black ?? ""}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovesList;
