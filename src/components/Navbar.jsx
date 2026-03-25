// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import playlogo from '../assets/Play Galaxy White.png';

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav
        className="w-full py-4 px-4 md:px-6 flex items-center shadow-custom z-20 relative"
        style={{
          background: 'radial-gradient(circle, #302e2e 0%, #000000 100%)',
        }}
      >
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isDrawerOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-12 ml-8">
          <Link to="/" className="text-white text-xl hover:text-gray-300">
            Home
          </Link>
          <Link to="/register" className="text-white text-xl hover:text-gray-300">
            Register
          </Link>
          <Link to="/ranking" className="text-white text-xl hover:text-gray-300">
            Rankings
          </Link>
        </div>

        {/* PlayGalaxy Logo */}
        <div className="flex-1 flex justify-center md:justify-center">
          <img
            src={playlogo}
            className="h-8 md:h-14 md:absolute md:left-1/2 md:-translate-x-1/2 bottom-0"
            alt="Play Galaxy Logo"
          />
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 md:hidden ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleDrawer}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 z-40 md:hidden ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'radial-gradient(circle, #5a24d2 0%, #000000 100%)',
        }}
      >
        <div className="p-4 border-b border-blue-800">
          <img src={playlogo} className="h-8 mx-auto" alt="Play Galaxy Logo" />
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <Link to="/" className="text-white text-lg font-semibold" onClick={toggleDrawer}>
            Home
          </Link>
          <Link to="/register" className="text-white text-lg font-semibold" onClick={toggleDrawer}>
            Register
          </Link>
          <Link to="/ranking" className="text-white text-lg font-semibold" onClick={toggleDrawer}>
            Rankings
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;