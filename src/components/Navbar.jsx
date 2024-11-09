// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import playlogo from '../assets/Play Galaxy White.png';
import samsungLogo from '../assets/Samsung White.png';

function Navbar() {
  return (
    <nav
      className="w-full py-4 px-4 md:px-6 flex justify-between items-center bg-blue-900 shadow-custom z-10 font-bold"
      style={{
        background: 'radial-gradient(circle, #002447 0%, #000000 100%)',
      }}
    >
      <div className="flex space-x-6 sm:space-x-8 md:space-x-12 ml-4 md:ml-8">
        <Link to="/" className="text-white text-sm sm:text-lg md:text-xl">
          Home
        </Link>
        <Link to="/register" className="text-white text-sm sm:text-lg md:text-xl">
          Register
        </Link>
        <Link to="/ranking" className="text-white text-sm sm:text-lg md:text-xl">
          Rankings
        </Link>
      </div>
      <div className="flex items-center">
        <img src={playlogo} className="h-8 sm:h-10 md:h-14 mr-8 md:mr-24" alt="Play Galaxy Logo" />
      </div>
      <img src={samsungLogo} className="h-5 sm:h-6 md:h-8 mr-4 md:mr-8" alt="Samsung Logo" />
    </nav>
  );
}

export default Navbar;
