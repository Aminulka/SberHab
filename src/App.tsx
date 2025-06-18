import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Slider from './components/Slider';
import FabricsSection from './components/FabricsSection';
import AboutCompany from './pages/AboutCompany/AboutCompany';
import Projects from './pages/Projects/Projects';
import HowToPaint from './pages/HowToPaint/HowToPaint';
import Basic from './components/collections/Basic';
import Certificates from './pages/Certificates/Certificates';
import Footer from './components/Footer';
import LocationMap from './components/LocationMap';
import WhereToBuy from './pages/WhereToBuy';
import './styles/app.css';
// Импортируем стили
import './styles/header.css';
import './styles/hero.css';
import './styles/features.css';
import './styles/slider.css';
import './styles/fabrics.css';
import './pages/AboutCompany/about-company.css';
import './pages/Projects/projects.css';
import './pages/HowToPaint/how-to-paint.css';
import './styles/collections.css';
import './pages/Certificates/certificates.css';
import './styles/location-map.css';
import Reviews from './components/Reviews';
import ReviewPage from './pages/Reviews/Review-page';
import ScrollToTop from './components/ScrollToTop';

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <Slider />
    <FabricsSection />
    <LocationMap />
    <Reviews />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about/reviews' element={<ReviewPage />} />
          <Route path='/about/company' element={<AboutCompany />} />
          <Route path='/about/projects' element={<Projects />} />
          <Route path='/about/certificates' element={<Certificates />} />
          <Route path='/info/how-to-paint' element={<HowToPaint />} />
          <Route path='/collections/basic' element={<Basic />} />
          <Route path='/where-to-buy' element={<WhereToBuy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
