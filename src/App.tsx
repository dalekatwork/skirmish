import { useEffect, useRef, useState } from "react";
import { MAP_SIZE, randomMap, startingUnits, type Terrain } from "./map";

const TILE = 20;

const TERRAIN_COLOURS: Record<Terrain, string> = {
  grass: "#3f6b35",
  water: "#2b5d8a",
  rock: "#6b6b6b",
  forest: "#24452a",
};

const PLAYER_COLOURS = { 1: "#60a5fa", 2: "#f87171" } as const;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [map, setMap] = useState(() => randomMap());
  const [units] = useState(startingUnits);
  const [selected, setSelected] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    for (let y = 0; y < MAP_SIZE; y++) {
      for (let x = 0; x < MAP_SIZE; x++) {
        ctx.fillStyle = TERRAIN_COLOURS[map[y][x]];
        ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
        ctx.strokeStyle = "rgba(0,0,0,0.15)";
        ctx.strokeRect(x * TILE, y * TILE, TILE, TILE);
      }
    }

    for (const u of units) {
      ctx.fillStyle = PLAYER_COLOURS[u.owner];
      ctx.beginPath();
      ctx.arc(u.x * TILE + TILE / 2, u.y * TILE + TILE / 2, TILE / 3, 0, Math.PI * 2);
      ctx.fill();
    }

    if (selected) {
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 2;
      ctx.strokeRect(selected.x * TILE + 1, selected.y * TILE + 1, TILE - 2, TILE - 2);
      ctx.lineWidth = 1;
    }
  }, [map, units, selected]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = e.currentTarget.width / rect.width;
    const x = Math.floor(((e.clientX - rect.left) * scale) / TILE);
    const y = Math.floor(((e.clientY - rect.top) * scale) / TILE);
    setSelected({ x, y });
  };

  const selectedTerrain = selected ? map[selected.y][selected.x] : null;
  const selectedUnit = selected
    ? units.find((u) => u.x === selected.x && u.y === selected.y)
    : undefined;

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-6">
      <h1 className="text-3xl font-semibold tracking-tight">Skirmish</h1>

      <canvas
        ref={canvasRef}
        width={MAP_SIZE * TILE}
        height={MAP_SIZE * TILE}
        onClick={handleClick}
        className="w-full max-w-[640px] cursor-crosshair rounded-md border border-neutral-700"
      />

      <div className="flex items-center gap-6 text-sm text-neutral-400">
        <span>
          {selected
            ? `Tile ${selected.x}, ${selected.y}: ${selectedTerrain}${
                selectedUnit ? ` (player ${selectedUnit.owner} unit)` : ""
              }`
            : "Click a tile to inspect it"}
        </span>
        <button
          onClick={() => {
            setMap(randomMap());
            setSelected(null);
          }}
          className="rounded-md border border-neutral-600 px-3 py-1.5 text-neutral-200 hover:bg-neutral-800"
        >
          New map
        </button>
      </div>
    </main>
  );
}
