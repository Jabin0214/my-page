import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/pageComponents/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Footer from './components/pageComponents/Footer'
import BackgroundVisual from './components/ui/BackgroundVisual'

function App() {
  return (
    <Router basename="/my-page/">
      <div className="min-h-screen bg-neutral-900 text-white relative overflow-hidden">
        <BackgroundVisual />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App