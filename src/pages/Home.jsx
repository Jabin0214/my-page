import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-[#ffffff]">
      <div className="text-center animate-in fade-in slide-in-from-bottom duration-1000">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-neutral-500 to-neutral-900 bg-clip-text text-transparent">
          Hi, I'm Jabin
        </h1>
        <p className="text-xl text-neutral-400 mb-8">Full Stack Developer / UI Designer / Creator</p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/projects" 
            className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-full transition-colors"
          >
            Projects
          </Link>
          <Link 
            to="/contact" 
            className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-full transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home