import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'

const rootEl = document.getElementById('root')!
createRoot(rootEl).render(
  <React.StrictMode>
    <DarkModeBinder>
      <App />
    </DarkModeBinder>
  </React.StrictMode>
)

function DarkModeBinder({ children }: { children: React.ReactNode }){
  useEffect(() => {
    const saved = localStorage.getItem('theme')?.replace(/"/g, '')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const mode = saved || (prefersDark ? 'dark' : 'light')
    const html = document.documentElement
    html.classList.toggle('dark', mode === 'dark')
    html.setAttribute('data-theme', mode)
  }, [])
  return <>{children}</>
}
