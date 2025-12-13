# FAQ Component

A reusable Frequently Asked Questions (FAQ) component built with React, TypeScript, and Vite. Features accordion-style expand/collapse functionality with smooth animations.

## 🚀 Technologies

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS** - Styling and animations

## ✨ Features

- ✅ Reusable FAQ component with TypeScript interfaces
- ✅ Accordion-style expand/collapse functionality
- ✅ Configurable options (title, allowMultipleOpen)
- ✅ Smooth animations and transitions
- ✅ Responsive design
- ✅ Accessible (ARIA attributes)

## 📸 Screenshot

![FAQ Component](./screenshots/faq-component.png)

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
faq-component/
├── src/
│   ├── components/
│   │   ├── FAQ.tsx          # Main FAQ container component
│   │   └── FAQItem.tsx       # Individual FAQ item component
│   ├── types/
│   │   └── faq.ts            # TypeScript interfaces
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Entry point
├── screenshots/              # Project screenshots
└── package.json
```

## 💻 Usage

```tsx
import { FAQ } from './components/FAQ';
import type { FaqItem } from './types/faq';

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces."
  },
  // ... more items
];

function App() {
  return (
    <FAQ 
      items={faqData}
      title="Frequently Asked Questions"
      allowMultipleOpen={false}
    />
  );
}
```

## 🎯 Key Concepts Demonstrated

- **React Hooks**: `useState` for state management
- **TypeScript**: Interfaces and type safety
- **Component Composition**: Building reusable components
- **Conditional Rendering**: Showing/hiding content based on state
- **Event Handling**: Click handlers and state updates
- **CSS Animations**: Smooth transitions and effects

## 📝 License

This project is open source and available for practice purposes.
