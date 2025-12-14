# React Practice Projects

This folder contains all my React practice projects and exercises.

## Projects

### 1. FAQ Component
A reusable Frequently Asked Questions (FAQ) component built with React, TypeScript, and Vite. Features accordion-style expand/collapse functionality with smooth animations.

**Technologies:** React, TypeScript, Vite, CSS

**Key Features:**
- Reusable FAQ component with TypeScript interfaces
- Accordion-style expand/collapse functionality
- Configurable options (title, allowMultipleOpen)
- Smooth animations and transitions
- Responsive design

**Repository:** Part of [react-practice](https://github.com/varunshah3129/react-practice)

**Location:** `./faq-component/`

**Project Output:**
The FAQ component displays a list of questions that can be expanded to reveal answers. When a question is clicked:
- The answer smoothly slides down with animation
- The icon changes from `+` to `−`
- Only one item can be open at a time (configurable)
- Each FAQ item has a clean, modern design with hover effects

**To Run:**
```bash
cd faq-component
npm install
npm run dev
```

**Screenshot:**
![FAQ Component](./faq-component/screenshots/faq-component.png)

### 2. Connect 4 Game
A classic Connect 4 game built with React, TypeScript, and Vite. Two players take turns dropping colored discs into a grid, aiming to connect four of their discs in a row (horizontal, vertical, or diagonal).

**Technologies:** React, TypeScript, Vite, CSS

**Key Features:**
- Interactive game board with 6 rows × 7 columns
- Turn-based gameplay (Red and Yellow players)
- Win detection (4 in a row: horizontal, vertical, diagonal)
- Draw detection when board is full
- Reset functionality to start a new game
- Smooth animations and modern UI

**Repository:** Part of [react-practice](https://github.com/varunshah3129/react-practice)

**Location:** `./connect4-game/`

**Project Output:**
The Connect 4 game features a blue board where players drop red and yellow discs. The game tracks turns, detects wins and draws, and displays the current player status.

**To Run:**
```bash
cd connect4-game
npm install
npm run dev
```

**Screenshot:**
![Connect 4 Game](./connect4-game/screenshots/connect4-game.png)

---

Add your React projects here. Each project should be in its own subfolder.

## Getting Started

To create a new React project, you can use:

```bash
npx create-react-app project-name
```

Or with Vite:

```bash
npm create vite@latest project-name -- --template react
```

## Notes

- Keep each project in its own folder
- Add a brief description of what each project demonstrates
- Document any key concepts or techniques learned
