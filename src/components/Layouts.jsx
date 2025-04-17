import React from 'react';
import bgImage from '../assets/website banner bg.png';

const Layout = ({ children }) => {
  return (
    <main className="relative w-full flex-grow min-h-screen bg-main-bg">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: '1970px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          filter: 'blur(20px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 py-6 w-full flex flex-col items-center text-white text-center">
        {children}
      </div>
    </main>
  );
};

export default Layout;
