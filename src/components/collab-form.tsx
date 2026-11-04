import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Loader2 } from 'lucide-react'

type State = 'idle' | 'pending' | 'success' | 'error'

const TYPES = [
  'Collaboration',
  'Sponsorship',
  'Live show / Booking',
  'Press / Interview',
]

const field =
  'w-full bg-transparent border-0 border-b-2 border-ink/25 px-0 py-3 text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none focus:ring-0 transition-colors motion-reduce:transition-none'
const label = 'block font-display uppercase tracking-[0.2em] text-xs text-ink/60'

export function CollabForm() {
  const [state, setState] = useState<State>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const form = event.currentTarget
    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) =>
      body.append(key, String(value)),
    )
    setState('pending')
    try {
      const response = await fetch('/collab-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      const unprocessed = /\bdata-netlify\s*=/i.test(await response.text())
      if (unprocessed) throw new Error('Form handling is unavailable')
      setState('success')
      form.reset()
    } catch {
      setState('error')
    }
  }

  return (
    <form
      name="collab"
      method="POST"
      action="/collab-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state !== 'pending' && state !== 'idle') setState('idle')
      }}
    >
      <input type="hidden" name="form-name" value="collab" />
      <p hidden>
        <label>
          Leave empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="grid gap-7">
        <legend className="sr-only">Collaboration enquiry</legend>
        <div className="grid gap-7 sm:grid-cols-2">
          <label className="block">
            <span className={label}>Your name / brand</span>
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              className={field}
              placeholder="Who's reaching out?"
            />
          </label>
          <label className="block">
            <span className={label}>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              className={field}
              placeholder="you@brand.com"
            />
          </label>
          <label className="block">
            <span className={label}>Phone (optional)</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={20}
              className={field}
              placeholder="+91"
            />
          </label>
          <label className="block">
            <span className={label}>Enquiry type</span>
            <select
              name="type"
              required
              defaultValue="Collaboration"
              className={field + ' cursor-pointer'}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className={label}>The idea</span>
          <textarea
            name="message"
            required
            maxLength={2000}
            rows={4}
            className={field + ' resize-none'}
            placeholder="Track feature, brand campaign, show dates, budget…"
          />
        </label>
        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            className="group inline-flex items-center gap-3 bg-ink text-bone px-8 py-4 font-display uppercase tracking-[0.2em] text-sm hover:bg-primary transition-colors motion-reduce:transition-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {state === 'pending' ? (
              <>
                <Loader2 className="size-4 animate-spin motion-reduce:animate-none" />
                Sending…
              </>
            ) : (
              <>
                Send enquiry
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </>
            )}
          </button>
          {state === 'success' && (
            <p role="status" className="font-tag text-lg text-primary">
              Received. Team Mayank will hit you back soon.
            </p>
          )}
          {state === 'error' && (
            <p role="alert" className="text-sm text-primary max-w-sm">
              That didn't go through. Your details are still here, so try
              again, or email us directly.
            </p>
          )}
        </div>
      </fieldset>
    </form>
  )
}
