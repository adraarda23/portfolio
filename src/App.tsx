import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PortfolioProvider } from '@/context/PortfolioContext'
import Landing from '@/pages/Landing'

const Admin = lazy(() => import('@/pages/Admin'))

function AdminFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 text-slate-400">
      <div className="flex items-center gap-3 font-mono text-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent-cyan" />
        loading admin…
      </div>
    </div>
  )
}

export default function App() {
  return (
    <PortfolioProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminFallback />}>
              <Admin />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PortfolioProvider>
  )
}
