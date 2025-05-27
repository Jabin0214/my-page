/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'text-gradient': 'gradientMove 3s infinite linear',
        'bg-move': 'bg-move 10s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'bg-move': {
          '0%, 100%': { transform: 'translate(-50%, -50%)' },
          '50%': { transform: 'translate(-40%, -45%)' },
        },
        'fadeIn': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      transitionDelay: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '2000': '2000ms',
        '4000': '4000ms',
      },
    },
  },
  plugins: [
  ],
}