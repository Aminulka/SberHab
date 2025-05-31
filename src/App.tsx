import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import './styles/style.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
    </div>
  );
};

export default App;
