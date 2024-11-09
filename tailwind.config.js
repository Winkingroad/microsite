// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path if necessary
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Samsung Sans', 'ui-sans-serif', 'system-ui'], // Fallbacks if Samsung Sans is unavailable
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, #002447, #000000)',
        'main-bg': "url('/src/assets/background.png')",
        'thumbnail': "url('/src/assets/Group\ 6.png')"
      },
      boxShadow: {
        'custom': '0px 5px 32.3px 6px #0B5197', // x-offset 0, y-offset 3, blur 32.3, spread 6
        'custom2': '0px 2px 42.3px 1px #0B5197',
        'custom3': '0px 0px 24.8px 1px #6EA7F3'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.bg-main-size': {
          'background-size': '1080px 720px'
        }
      });
    },
  ],
};
