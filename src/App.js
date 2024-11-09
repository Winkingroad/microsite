import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'; // Ensure Tailwind CSS is imported here
import bgImage from './assets/background.png';
import samsungLogo from './assets/Samsung White.png';
import playlogo from './assets/Play Galaxy White.png';
import galaxyCup from './assets/Thumbnail.png';
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
          We're thrilled to announce a new gaming experience at our Samsung Exclusive Stores, spotlighting our Hero Devices the Samsung Fold 6 and S24FE crafted to elevate every gamer’s experience. This month-long event invites gaming enthusiasts to step into the challenge and compete for thrilling prizes each weekend!
        </p>
        <p className="text-white max-w-md sm:max-w-lg md:max-w-4xl text-sm sm:text-base md:text-lg mt-0 text-center">
          Running across 51 stores in 19 cities from November 9th to December 1st, #PlayGalaxy offers countless chances to join the action. Each store will feature a Leaderboard Stand that tracks participants' lap times, highlighting the day's top competitors. Every day, the top 3 fastest players at each store will get exciting prizes, and everyone who joins will receive a certificate and exclusive goodies as a thank you for their participation!
        </p>
        <p className="text-white max-w-md sm:max-w-lg md:max-w-4xl text-sm sm:text-base md:text-lg mt-0 text-center">
          For an even bigger stage, our Top 5 premium stores will broadcast the gaming challenges live on YouTube, allowing participants to showcase their skills to a broader audience.
        </p>
        <p className="text-white max-w-md sm:max-w-lg md:max-w-xl text-sm sm:text-base md:text-lg mt-0 text-center">
          Get ready to play, race, and win with #PlayGalaxy!
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
