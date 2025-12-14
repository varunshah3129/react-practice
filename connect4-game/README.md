# Connect 4 Game

A classic Connect 4 game built with React, TypeScript, and Vite. Two players take turns dropping colored discs into a grid, aiming to connect four of their discs in a row (horizontal, vertical, or diagonal).

## 🚀 Technologies

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS** - Styling and animations

## ✨ Features

- ✅ Interactive game board with 6 rows × 7 columns
- ✅ Turn-based gameplay (Red and Yellow players)
- ✅ Win detection (4 in a row: horizontal, vertical, diagonal)
- ✅ Draw detection when board is full
- ✅ Reset functionality to start a new game
- ✅ Smooth animations and modern UI
- ✅ TypeScript for type safety

## 📸 Screenshot

![Connect 4 Game](./screenshots/connect4-game.png)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

## 📁 Project Structure

```
connect4-game/
├── src/
│   ├── components/
│   │   ├── Board.tsx          # Game board component
│   │   ├── Cell.tsx           # Individual cell component
│   │   ├── GameResult.tsx     # Game status display
│   │   └── ResetButton.tsx     # Reset game button
│   ├── types/
│   │   └── game.ts            # TypeScript interfaces
│   ├── App.tsx                 # Main app component
│   └── main.tsx               # Entry point
├── screenshots/               # Project screenshots
└── package.json
```

## 🎮 How to Play

1. **Red player** starts first
2. Click on any column to drop your disc
3. Discs fall to the lowest available position in that column
4. Players alternate turns
5. First player to get **4 discs in a row** (horizontal, vertical, or diagonal) wins!
6. If the board fills up with no winner, it's a **draw**
7. Click **Reset Game** to start over

## 💻 Key Concepts Demonstrated

- **React Hooks**: `useState` for game state management
- **TypeScript**: Interfaces, types, and type safety
- **Component Composition**: Building reusable components
- **Game Logic**: Win detection algorithms, state management
- **Event Handling**: Click handlers and state updates
- **CSS Styling**: Modern UI with gradients and animations

## 🎯 Game Logic

### Win Detection
The game checks for 4 in a row in all directions:
- **Horizontal**: Left to right
- **Vertical**: Top to bottom
- **Diagonal (\)**: Top-left to bottom-right
- **Diagonal (/)** : Top-right to bottom-left

### Draw Detection
The game detects a draw when:
- The board is completely full (top row has no empty cells)
- No player has won

## 📝 License

This project is open source and available for practice purposes.
