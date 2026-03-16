import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTE_META, SITE_CONFIG } from '../config/site'

export const useRouteMetadata = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = ROUTE_META[location.pathname]?.title || SITE_CONFIG.title
  }, [location.pathname])
}
