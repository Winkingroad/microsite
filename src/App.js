import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './index.css'; // Ensure Tailwind CSS is imported here
import bgImage from './assets/IMG_2240.png';
import samsungLogo from './assets/Samsung White.png';
import playlogo from './assets/Play Galaxy White.png';
import galaxyCup from './assets/IMG_2238.png';
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
    <main className="relative w-full flex-grow">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 z-0 bg-main-bg"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '2190px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          // filter: 'blur(20px)',
        }}
      />

      {/* Content Overlay */}
      <div className="relative flex flex-col items-center px-4 sm:px-6 py-0 sm:py-0 space-y-6 text-center w-full text-white">
        {/* Logo */}
        <img
          src={galaxyCup}
          className="h-48 sm:h-72 md:h-96 lg:h-120 mix-blend-difference z-10"
          style={{ mixBlendMode: 'lighten' }}
          alt="Galaxy Cup Logo"
        />

        {/* Description */}
        <p className="max-w-md sm:max-w-lg md:max-w-4xl text-sm sm:text-base md:text-lg mt-0 text-center">
  We are coming back, bringing the #PlayGalaxy experience to life once again, this time bigger, faster, and more immersive than ever, powered by our latest innovation, the Samsung Galaxy S26 Ultra, built to take mobile gaming to the next level.


        </p>

        <p className="max-w-md sm:max-w-lg md:max-w-4xl text-sm sm:text-base md:text-lg mt-0 text-center">
         From 21st March to 19th April 2026, #PlayGalaxy will take over 50 Samsung Experience Stores across 15 cities in India, giving gamers everywhere the chance to jump into the action, showcase their skills, and rise through the ranks.



        </p>

        <p className="max-w-md sm:max-w-lg md:max-w-xl text-sm sm:text-base md:text-lg mt-0 text-center">
          As the journey unfolds, top players from each city will advance to City Finals, where the best of the best will compete for ultimate bragging rights.

        </p>

        <p className="max-w-md sm:max-w-lg md:max-w-xl text-sm sm:text-base md:text-lg mt-0 text-center">
        Get ready to play, compete, and connect with the power of #PlayGalaxy #SamsungExperienceStores.
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
      </div>
    </main>
  );
}

export default App;
