import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" }
  ];

  const [isSelect, setIsSelect] = useState("");
  const handleSelect = (lable) => {
    setIsSelect(lable);
  }
  
  return (
    <div className="fixed top-8 left-0 right-0 flex justify-center z-50">
      <nav className="fixed w-1/2 bg-[#0f0f0f]/80 backdrop-blur-lg z-50 rounded-full px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-neutral-200">
            Jabin's Portfolio
          </Link>
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleSelect(link.label)}
                className={`hover:text-black transition-colors 
                hover:bg-white px-4 py-2 rounded-full
                ${isSelect==link.label ? "bg-white text-black" : "bg-transparent"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar