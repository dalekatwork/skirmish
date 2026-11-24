export type Terrain = "grass" | "water" | "rock" | "forest";

export interface Unit {
  id: number;
  x: number;
  y: number;
  owner: 1 | 2;
}

export const MAP_SIZE = 32;

export function randomMap(size = MAP_SIZE): Terrain[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => {
      const r = Math.random();
      if (r < 0.08) return "water";
      if (r < 0.14) return "rock";
      if (r < 0.26) return "forest";
      return "grass";
    }),
  );
}

export function startingUnits(): Unit[] {
  return [
    { id: 1, x: 3, y: 3, owner: 1 },
    { id: 2, x: 4, y: 3, owner: 1 },
    { id: 3, x: 3, y: 4, owner: 1 },
    { id: 4, x: 28, y: 28, owner: 2 },
    { id: 5, x: 27, y: 28, owner: 2 },
    { id: 6, x: 28, y: 27, owner: 2 },
  ];
}
