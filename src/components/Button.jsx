import React from 'react';

const Button = ({ text }) => {
  return (
    <button
      className=" text-black inline-block border-[4px] border-black bg-gray-500 shadow-[0_8px_0_0_black] active:shadow-none active:translate-y-[8px] transition-all duration-100 ease-in-out select-none"
    >
      <span className="block bg-[#dddddd] border-[1px] border-white px-4 py-2 text-lg tracking-wide font-semibold">
        {text}
      </span>
    </button>
  );
};

export default Button;