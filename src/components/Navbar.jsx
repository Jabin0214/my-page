import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" }
  ];

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
                className="text-neutral-400 hover:text-neutral-200 transition-colors"
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