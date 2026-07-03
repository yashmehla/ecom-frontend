import { useEffect, useRef } from 'react'

// Simple global toast — call window.__toast('message') from anywhere
let setGlobalMsg: ((msg: string) => void) | null = null

export function showToast(msg: string) {
  setGlobalMsg?.(msg)
}

export function Toast() {
  const elRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    setGlobalMsg = (msg: string) => {
      const el = elRef.current
      if (!el) return
      el.textContent = msg
      el.classList.add('show')
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => el.classList.remove('show'), 2400)
    }
    return () => { setGlobalMsg = null }
  }, [])

  return <div className="toast" ref={elRef} aria-live="polite" />
}