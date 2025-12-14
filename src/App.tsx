import { Routes, Route, Link } from 'react-router-dom';
import { FAQ } from '@faq/components/FAQ';
import Connect4App from '@connect4/App';
import { SecurityCodeInput } from '@security/components/SecurityCodeInput';
import { Histogram } from '@histogram/components/Histogram';
// Import CSS files for each project
import '@faq/App.css';
import '@faq/index.css';
// Import Connect4 CSS - it will be scoped by our overrides
import '@connect4/App.css';
import '@connect4/index.css';
import './App.css';

// Home page component
const Home = () => {
  const projects = [
    { path: '/faq', name: 'FAQ Component', description: 'Reusable FAQ component with accordion functionality' },
    { path: '/connect4', name: 'Connect 4 Game', description: 'Classic Connect 4 game with win detection' },
    { path: '/security-code', name: 'Security Code Input', description: '4-digit 2FA code input with validation' },
    { path: '/histogram', name: 'Histogram Visualization', description: 'Data visualization with frequency charts' },
  ];

  return (
    <div className="home">
      <h1>React Practice Projects</h1>
      <p className="subtitle">Collection of React practice projects and exercises</p>
      <div className="projects-grid">
        {projects.map((project) => (
          <Link key={project.path} to={project.path} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <span className="view-link">View Project →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="app">
      {/* Navigation bar */}
      <nav className="navbar">
        <Link to="/" className="logo">React Practice</Link>
      </nav>

      {/* Main content area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQWrapper />} />
          <Route path="/connect4" element={<Connect4Wrapper />} />
          <Route path="/security-code" element={<SecurityCodeWrapper />} />
          <Route path="/histogram" element={<HistogramWrapper />} />
        </Routes>
      </main>
    </div>
  );
}

// Wrapper components to provide data/props
const FAQWrapper = () => {
  const faqData = [
    { id: 1, question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
    { id: 2, question: "How do I install React?", answer: "You can install React using npm or yarn." },
    { id: 3, question: "What are React Hooks?", answer: "React Hooks are functions that let you use state and other React features." },
  ];
  return <FAQ items={faqData} title="Frequently Asked Questions" allowMultipleOpen={false} />;
};

const Connect4Wrapper = () => {
  return (
    <div className="connect4-wrapper">
      <Connect4App />
    </div>
  );
};

const SecurityCodeWrapper = () => {
  return <SecurityCodeInput />;
};

const HistogramWrapper = () => {
  return <Histogram />;
};

export default App;

