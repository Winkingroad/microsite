import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'; // Ensure Tailwind CSS is imported here
import bgImage from './assets/background.png';
import samsungLogo from './assets/Samsung White.png';
import playlogo from './assets/Play Galaxy White.png';
import galaxyCup from './assets/Image (1).jpg';
import Navbar from './components/Navbar';
import RegisterForm from './components/Resgister';
import Ranking from './components/Ranking';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col items-center">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <main
      className="flex flex-col items-center px-4 sm:px-6 py-6 sm:py-8 space-y-6 text-center bg-main-bg bg-repeat w-full flex-grow"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: '1770px',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo */}
      <img
        src={galaxyCup}
        className="h-48 sm:h-72 md:h-96 lg:h-120 mix-blend-difference z-0"
        style={{ mixBlendMode: 'difference'}}
        alt="Galaxy Cup Logo"
      />

      {/* Description */}
      <p className="text-white max-w-md sm:max-w-lg md:max-w-4xl text-sm sm:text-base md:text-lg mt-0 text-center">
      We are thrilled to introduce an exclusive gaming experience at Samsung Experience Stores, featuring our flagship devices—the Galaxy Z Fold6 and Galaxy S24 FE—crafted to elevate mobile gaming to new heights. This month-long event invites everyone to dive in, explore, and be part of a truly immersive adventure.
          {/* We’re excited to unveil a brand-new gaming experience exclusively at Samsung Experience Stores, featuring our flagship devices, The Galaxy Z Fold6 and Galaxy S24FE—designed to elevate every gamer’s journey. This month-long event invites gaming enthusiasts to step up, compete, and embrace the thrill of the challenge every weekend! */}
        </p>
        <p className="text-white max-w-md sm:max-w-lg md:max-w-4xl text-sm sm:text-base md:text-lg mt-0 text-center">
        From November 16th to December 8th, #PlayGalaxy will come alive across 51 Samsung Experience Stores in 19 cities, offering countless opportunities to jump into the action. Come and join us on a journey designed to explore the thrill and excitement of gaming with our hero devices!

        </p>
        {/* <p className="text-white max-w-md sm:max-w-lg md:max-w-4xl text-sm sm:text-base md:text-lg mt-0 text-center">
          For an even larger audience, our Top 5 premium stores will live-stream the gaming challenges on YouTube, allowing players to showcase their skills and compete in front of viewers nationwide.

        </p> */}
        <p className="text-white max-w-md sm:max-w-lg md:max-w-xl text-sm sm:text-base md:text-lg mt-0 text-center">
        Get ready to play, discover, and connect with the power of #PlayGalaxy #SamsungExperienceStores
        </p>
      
      {/* Buttons */}
      <div className="space-y-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-3xl">
        <Link
          to="/register"
          className="block w-full bg-white bg-opacity-5 py-3 sm:py-4 md:py-6 text-xl sm:text-2xl md:text-4xl font-semibold my-4 md:my-8 text-center"
        >
          Register here
        </Link>
        <Link
          to="/ranking"
          className="block w-full bg-white bg-opacity-5 py-3 sm:py-4 md:py-6 text-xl sm:text-2xl md:text-4xl font-semibold"
        >
          Rankings
        </Link>
      </div>
    </main>
  );
}

export default App;
