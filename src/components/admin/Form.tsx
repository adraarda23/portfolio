import { joinList, splitList } from '@/lib/utils'
import { Icon } from '@/lib/icons'

export type FieldType = 'text' | 'textarea' | 'number' | 'list' | 'lines' | 'icon' | 'select'

export interface FieldDef<T> {
  key: keyof T & string
  label: string
  type?: FieldType
  placeholder?: string
  hint?: string
  half?: boolean
  required?: boolean
  options?: { value: string | number; label: string }[]
}

type Values = Record<string, unknown>

export function toValues<T extends object>(item: T | undefined, fields: FieldDef<T>[], defaults: Partial<T>): Values {
  const v: Values = {}
  for (const f of fields) {
    const raw = item ? (item as Values)[f.key] : (defaults as Values)[f.key]
    if (f.type === 'list') v[f.key] = joinList(raw as string[] | undefined)
    else if (f.type === 'lines') v[f.key] = ((raw as string[] | undefined) ?? []).join('\n')
    else v[f.key] = raw ?? (f.type === 'number' ? 0 : '')
  }
  return v
}

export function fromValues<T extends object>(values: Values, fields: FieldDef<T>[]): T {
  const out: Values = {}
  for (const f of fields) {
    const raw = values[f.key]
    if (f.type === 'list') out[f.key] = splitList(String(raw ?? ''))
    else if (f.type === 'lines')
      out[f.key] = String(raw ?? '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    else if (f.type === 'number') out[f.key] = Number(raw ?? 0)
    else if (f.type === 'select' && f.options?.length && typeof f.options[0].value === 'number') out[f.key] = Number(raw)
    else out[f.key] = raw === '' ? null : raw
  }
  return out as T
}

interface FieldsProps<T> {
  fields: FieldDef<T>[]
  values: Values
  onChange: (key: string, value: unknown) => void
}

export function Fields<T extends object>({ fields, values, onChange }: FieldsProps<T>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `f-${f.key}`
        const value = values[f.key] as string | number
        const common = {
          id,
          className: 'input',
          placeholder: f.placeholder,
          required: f.required,
        }
        return (
          <div key={f.key} className={f.half ? '' : 'sm:col-span-2'}>
            <label htmlFor={id} className="label">
              {f.label}
            </label>
            {f.type === 'textarea' || f.type === 'lines' ? (
              <textarea {...common} rows={f.type === 'lines' ? 5 : 4} className="input resize-y" value={value as string} onChange={(e) => onChange(f.key, e.target.value)} />
            ) : f.type === 'select' ? (
              <select {...common} value={value} onChange={(e) => onChange(f.key, e.target.value)}>
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : f.type === 'icon' ? (
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-stone-900/10 bg-ink-800 text-xl text-accent-soft">
                  <Icon name={String(value)} />
                </span>
                <select {...common} value={value} onChange={(e) => onChange(f.key, e.target.value)}>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <input
                {...common}
                type={f.type === 'number' ? 'number' : 'text'}
                value={value}
                onChange={(e) => onChange(f.key, f.type === 'number' ? e.target.valueAsNumber : e.target.value)}
              />
            )}
            {f.hint && <p className="mt-1.5 text-xs text-stone-500">{f.hint}</p>}
          </div>
        )
      })}
    </div>
  )
}
