import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Toast = { id: number; kind: 'ok' | 'error'; text: string }
const ToastCtx = createContext<(kind: Toast['kind'], text: string) => void>(() => {})
export const useToast = () => useContext(ToastCtx)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const push = useCallback((kind: Toast['kind'], text: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, kind, text }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000)
  }, [])
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              className={cn(
                'glass pointer-events-auto flex items-center gap-2 rounded-2xl px-4 py-3 text-sm shadow-card',
                t.kind === 'ok' ? 'text-emerald-300' : 'text-rose-300',
              )}
            >
              {t.kind === 'ok' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

export function SaveButton({ saving, label = 'Save changes', className }: { saving: boolean; label?: string; className?: string }) {
  return (
    <button type="submit" disabled={saving} className={cn('btn-primary', className)}>
      {saving && <Loader2 size={16} className="animate-spin" />}
      {saving ? 'Saving…' : label}
    </button>
  )
}

export function PanelHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="card my-8 w-full max-w-2xl p-6 sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
            <div className="mt-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Confirm({ open, onCancel, onConfirm, text }: { open: boolean; onCancel: () => void; onConfirm: () => void; text: string }) {
  return (
    <Modal open={open} onClose={onCancel} title="Are you sure?">
      <p className="text-sm text-slate-400">{text}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button className="btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn bg-rose-500 text-white hover:bg-rose-400" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  )
}
