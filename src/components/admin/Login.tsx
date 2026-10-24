import { motion } from 'framer-motion'
import { Loader2, Lock } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { api, ApiError } from '@/lib/api'
import { Background } from '@/components/layout/Background'

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await api.auth.login(username, password)
      onSuccess()
    } catch (err) {
      setError(err instanceof ApiError ? (err.status === 401 ? 'Invalid username or password' : err.message) : 'Could not reach the server')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center px-4">
      <Background />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="card w-full max-w-sm p-8"
      >
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent-soft">
          <Lock size={20} />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold text-stone-900">Admin sign in</h1>
        <p className="mt-1 text-sm text-stone-600">Manage your portfolio content.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="u" className="label">Username</label>
            <input id="u" className="input" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="p" className="label">Password</label>
            <input id="p" type="password" className="input" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>

        {error && <p className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p>}

        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full">
          {busy && <Loader2 size={16} className="animate-spin" />}
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <Link to="/" className="mt-4 block text-center text-xs text-stone-500 hover:text-stone-900">
          ← Back to site
        </Link>
      </motion.form>
    </div>
  )
}
