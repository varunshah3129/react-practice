import './App.css'
import { FAQ } from './components/FAQ';
import type { FaqItem } from './types/faq';

function App() {

  const faqData: FaqItem[] = [
    {
      id: 1, // Unique identifier
      question: "What is React?", // The question text
      answer: "React is a JavaScript library for building user interfaces, particularly web applications. It allows developers to create reusable UI components." // The answer text
    },
    {
      id: 2,
      question: "How do I install React?",
      answer: "You can install React using npm or yarn. For a new project, use 'npx create-react-app my-app' or 'npm create vite@latest my-app -- --template react'."
    },
    {
      id: 3,
      question: "What are React Hooks?",
      answer: "React Hooks are functions that let you use state and other React features in functional components. Examples include useState, useEffect, and useContext."
    },
    {
      id: 4,
      question: "What is JSX?",
      answer: "JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files, which React then transforms into JavaScript."
    },
    {
      id: 5,
      question: "How does React handle state?",
      answer: "React uses state to manage component data that can change over time. The useState hook allows functional components to have state, and when state changes, React re-renders the component."
    }
  ];
 
  return (
    <div className="App">
      <FAQ items={faqData} title="Frequently Asked Questions" allowMultipleOpen={true} />
    </div>
  )
}

export default App
