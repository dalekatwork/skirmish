# Skirmish

A starter for a browser real-time strategy game with peer-to-peer multiplayer, built with React, TypeScript, Tailwind CSS and Vite.

## Current state

- Draws a 32×32 tile map on a canvas with four terrain types (grass, water, rock, forest).
- Terrain is random on every load and on "New map" (not seeded, not deterministic).
- Shows three placeholder units for each of two players.
- Clicking a tile highlights it and shows its terrain and any unit on it.
- No game loop, movement, economy, combat or networking yet.

## Planned

- Deterministic simulation core: fixed-point maths, seeded random numbers, fixed tick rate, state hashing
- Seeded map generation, camera, minimap and unit selection
- Workers, resources, buildings and unit training
- Flow-field pathfinding and group movement for hundreds of units
- Combat and fog of war
- Lockstep multiplayer over WebRTC with a small signalling server
- Desync detection, replays from seed plus commands, and spectator mode
- A computer opponent
- Lobby, polish and full test coverage

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run typecheck`.

## License

MIT, see [LICENSE](./LICENSE).
