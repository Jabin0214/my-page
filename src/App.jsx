import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/pageComponents/Navbar'
import Footer from './components/pageComponents/Footer'
import BackgroundVisual from './components/ui/BackgroundVisual'
import { APP_ROUTES } from './config/routes'
import { useRouteMetadata } from './hooks/useRouteMetadata'

function AppShell() {
  useRouteMetadata()

  return (
    <div className="min-h-screen bg-neutral-900 text-white relative overflow-hidden">
      <BackgroundVisual />
      <Navbar />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center px-6 pt-24 text-center text-sm text-white/70">
            Loading portfolio...
          </div>
        }
      >
        <Routes>
          {APP_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AppShell />
    </Router>
  )
}

export default App
