import React from 'react';

const Button = ({ text }) => {
  return (
    <button
      className="text-white inline-block border-[3px] border-gray-200 bg-gray-800 shadow-[0_6px_0_0_rgba(255,255,255,0.3)] active:shadow-none active:translate-y-[6px] transition-all duration-100 ease-in-out select-none"
    >
      <span className="block bg-gray-700 border-[1px] border-gray-600 px-4 py-2 text-lg tracking-wide font-semibold">
        {text}
      </span>
    </button>
  );
};

export default Button;