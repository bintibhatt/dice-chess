"use client";

import { useAppContext } from "../game/GameContext";

const MovesList = () => {
  const {
    appState: { movesList },
  } = useAppContext();

  return (
    <div className="max-h-80 overflow-y-auto rounded-xl border border-brass/20 bg-felt-dark/60 p-3 text-sm text-ivory">
      {movesList.length === 0 ? (
        <p className="text-ivory/50">No moves yet.</p>
      ) : (
        movesList.map((move, i) =>
          i % 2 === 0 ? (
            <div key={i} className="flex gap-2">
              <span className="w-6 text-ivory/50">{i / 2 + 1}.</span>
              <span>{move}</span>
              {movesList[i + 1] && <span>{movesList[i + 1]}</span>}
            </div>
          ) : null
        )
      )}
    </div>
  );
};

export default MovesList;
