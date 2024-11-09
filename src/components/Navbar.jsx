// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import playlogo from '../assets/Play Galaxy White.png';
import samsungLogo from '../assets/Samsung White.png';

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav
        className="w-full py-4 px-4 md:px-6 flex justify-between items-center shadow-custom z-20 relative"
        style={{
          background: 'radial-gradient(circle, #002447 0%, #000000 100%)',
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
            xmlns="http://www.w3.org/2000/svg"
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
          <Link to="/" className="text-white text-xl hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link to="/register" className="text-white text-xl hover:text-gray-300 transition-colors">
            Register
          </Link>
          <Link to="/ranking" className="text-white text-xl hover:text-gray-300 transition-colors">
            Rankings
          </Link>
        </div>

        {/* Logos */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <img src={playlogo} className="h-8 md:h-14 mr-24" alt="Play Galaxy Logo" />
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          <img src={samsungLogo} className="h-5 md:h-8" alt="Samsung Logo" />
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 md:hidden ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleDrawer}
      />

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'radial-gradient(circle, #002447 0%, #000000 100%)',
        }}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-blue-800">
          <img src={playlogo} className="h-8 mx-auto" alt="Play Galaxy Logo" />
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col p-4 space-y-4">
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-gray-300 transition-colors"
            onClick={toggleDrawer}
          >
            Home
          </Link>
          <Link
            to="/register"
            className="text-white text-lg font-semibold hover:text-gray-300 transition-colors"
            onClick={toggleDrawer}
          >
            Register
          </Link>
          <Link
            to="/ranking"
            className="text-white text-lg font-semibold hover:text-gray-300 transition-colors"
            onClick={toggleDrawer}
          >
            Rankings
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;