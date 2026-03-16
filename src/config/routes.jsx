import { lazy } from 'react'

const Home = lazy(() => import('../pages/Home'))
const Projects = lazy(() => import('../pages/Projects'))
const Contact = lazy(() => import('../pages/Contact'))

export const APP_ROUTES = [
  { path: '/', element: <Home /> },
  { path: '/projects', element: <Projects /> },
  { path: '/contact', element: <Contact /> },
]
