const Footer = () => {
  return (
    <footer className="page-shell pb-8 pt-4">
      <div className="surface-card px-6 py-5 text-sm text-[#526072]">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Jabin Chen</p>
          <p>Built with Next.js, a personal point of view, and a lot less chaos.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
