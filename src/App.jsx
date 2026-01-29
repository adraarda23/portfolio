import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Admin from './components/Admin'
import './App.css'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    // Check if URL has /admin or ?admin parameter
    const isAdminRoute = window.location.pathname === '/admin' ||
      window.location.search.includes('admin') ||
      window.location.hash === '#admin'
    setIsAdmin(isAdminRoute)
  }, [])

  // Render admin panel if on admin route
  if (isAdmin) {
    return <Admin />
  }

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
