const Footer = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-lg py-4">
      <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Jabin. Built with React, motion, and a little personality.</p>
      </div>
    </footer>
  )
}

export default Footer
