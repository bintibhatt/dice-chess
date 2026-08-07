# 🎲 Dice Chess

Standard chess with one twist: two dice roll at the start of every turn and
name which piece type(s) you're allowed to move. See
[**Marching Orders**](#marching-orders) below for the full rule.

## Features

* Full chess board with drag-and-drop piece movement
* Standard chess rules implementation
  * Check, checkmate, and stalemate detection
  * Castling, en passant, pawn promotion
  * Insufficient-material draw detection
  * Move history tracking and undo
* The "Marching Orders" dice rule layered on top, with a reroll, doubles, and
  an "Open Orders" fallback so a bad roll never freezes the game
* Game state managed with React Context + `useReducer`
* Responsive "High-Stakes Parlor" UI (felt/brass theme) built with Tailwind

## Marching Orders

Two dice auto-roll at the start of every turn; each face names a piece type
(`1` pawn, `2` knight, `3` bishop, `4` rook, `5` queen, `6` king). You may
only move a piece of the rolled type(s) this turn. Rules:

* **Reroll** — one free reroll per turn, both dice together.
* **Double Command** — roll doubles and you're locked to that one type, but
  get to move it twice before the turn passes.
* **Open Orders** — if nothing in the rolled set has a legal move (while you
  *do* have a legal move somewhere), the restriction lifts entirely for the
  turn. Dice narrow your choices; they never cause a false stalemate.
* Checkmate/stalemate detection always uses the full standard-chess legal
  move set, completely independent of the current roll.

## Project Structure

```text
app/                       # Next.js App Router: layout, root page, global CSS
components/
├── board/                 # Board grid, ranks/files labels, check/highlight state
├── controls/               # Move history panel, undo button
├── dice/                   # Dice tray: roll/reroll UI for Marching Orders
├── game/                   # Context/reducer provider, header, page shell
├── pieces/                 # Piece rendering + drag-and-drop move execution
└── popup/                  # Promotion choice and game-end dialogs
lib/
├── chess/                  # Pure rules engine: move generation, arbiter, dice rules
└── state/                  # Reducer, action creators, game-end detection
public/pieces/              # Piece sprites
```

## Technologies Used

* Next.js (App Router) + React
* JavaScript (ES6+)
* Tailwind CSS v4
* Context API + `useReducer` state management

## Getting Started

```bash
npm install
npm run dev
```

The application runs at `http://localhost:3000`.

## Available Scripts

* `npm run dev` — start the development server
* `npm run build` — production build
* `npm start` — run a production build
* `npm run lint` — lint the project

## Gameplay

1. Start a new game — dice roll automatically for the side to move.
2. Reroll if you want (once per turn), then drag an allowed piece to a
   highlighted legal square.
3. Track moves in the Move History panel; use Undo to revert the last move.
4. Continue until checkmate, stalemate, or a draw is reached.

## Future Improvements

* Multiplayer support / online matchmaking
* AI opponent
* Timer support
* Game save/load functionality
* Sound effects

## License

This project is intended for educational and learning purposes.
