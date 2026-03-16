import Home from '../src/views/Home'
import { SITE_CONFIG } from '../src/config/site'

export const metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
}

export default function Page() {
  return <Home />
}
