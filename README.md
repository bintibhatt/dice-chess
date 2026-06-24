# 🎲 Dice Chess

A React-based implementation of Chess enhanced with a dice-rolling mechanic. The game combines traditional chess rules with randomized dice outcomes, creating a unique and strategic gameplay experience.

## Features

* Full chess board with drag-and-drop piece movement
* Standard chess rules implementation

  * Check detection
  * Checkmate detection
  * Stalemate detection
  * Castling
  * Pawn promotion
  * Move history tracking
  * Undo moves
* Interactive dice rolling system
* Real-time move highlighting
* Game state management using React Context and Reducer
* Responsive user interface

## Project Structure

```text
src/
│
├── arbiter/              # Chess rules and move validation
├── assets/               # Chess piece images
├── components/
│   ├── Board/            # Chess board UI
│   ├── Control/          # Move list and controls
│   ├── Pieces/           # Piece rendering and movement
│   └── Popup/            # Promotion and game-end dialogs
│
├── contexts/             # React Context API
├── dice/                 # Dice rolling component
├── reducer/              # State management
├── constants.js          # Initial game configuration
├── helper.js             # Utility functions
└── App.js                # Main application component
```

## Technologies Used

* React 18
* JavaScript (ES6+)
* Context API
* useReducer State Management
* CSS3

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd dice-chess
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm start
```

The application will run at:

```text
http://localhost:3000
```

## Available Scripts

### Start Development Server

```bash
npm start
```

Runs the application in development mode.

### Run Tests

```bash
npm test
```

Launches the test runner.

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

### Eject Configuration

```bash
npm run eject
```

Copies all configuration files into the project for full customization.

## Gameplay

1. Start a new game.
2. Roll the dice using the Dice panel.
3. Move pieces according to standard chess rules.
4. Track moves in the move history panel.
5. Use the Undo button to revert the previous move.
6. Continue until checkmate, stalemate, or draw conditions are reached.

## Chess Rules Supported

* Legal move validation
* Check detection
* Checkmate detection
* Stalemate detection
* Castling (Kingside and Queenside)
* Pawn promotion
* En passant
* Insufficient material draw detection

## Future Improvements

* Integrate dice outcomes directly into move restrictions
* Multiplayer support
* Online matchmaking
* AI opponent
* Timer support
* Game save/load functionality
* Mobile optimizations
* Sound effects and animations

## License

This project is intended for educational and learning purposes.

## Author

Developed as a React-based Dice Chess application demonstrating chess logic, state management, and interactive UI design.
