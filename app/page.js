import GameProvider from "@/components/game/GameProvider";
import GameShell from "@/components/game/GameShell";

export default function Home() {
  return (
    <GameProvider>
      <GameShell />
    </GameProvider>
  );
}
