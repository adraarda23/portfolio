import { useEffect, useState, type FormEvent } from 'react'
import { ApiError } from '@/lib/api'
import type { WithoutId } from '@/lib/types'
import { Fields, fromValues, toValues, type FieldDef } from './Form'
import { PanelHeader, SaveButton, useToast } from './ui'

interface Props<T extends { id: number }> {
  title: string
  description: string
  item: T
  fields: FieldDef<T>[]
  save: (data: WithoutId<T>) => Promise<unknown>
  onSaved: () => Promise<void> | void
}

export function SingletonEditor<T extends { id: number }>({ title, description, item, fields, save, onSaved }: Props<T>) {
  const toast = useToast()
  const [values, setValues] = useState(() => toValues(item, fields, {}))
  const [saving, setSaving] = useState(false)

  useEffect(() => setValues(toValues(item, fields, {})), [item, fields])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = fromValues<T>(values, fields)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...rest } = payload
      await save(rest as WithoutId<T>)
      toast('ok', `${title} saved`)
      await onSaved()
    } catch (err) {
      toast('error', err instanceof ApiError ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PanelHeader title={title} description={description} />
      <form onSubmit={submit} className="card mt-8 p-6 sm:p-8">
        <Fields fields={fields} values={values} onChange={(k, v) => setValues((s) => ({ ...s, [k]: v }))} />
        <div className="mt-6 flex justify-end">
          <SaveButton saving={saving} />
        </div>
      </form>
    </div>
  )
}
