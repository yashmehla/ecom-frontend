import { useState, useEffect } from 'react'

interface CountdownResult {
  h: string
  m: string
  s: string
  total: number
}

export function useCountdown(initialSeconds: number): CountdownResult {
  const [left, setLeft] = useState(initialSeconds)

  useEffect(() => {
    const id = setInterval(() => {
      setLeft((l) => Math.max(0, l - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return {
    h: pad(Math.floor(left / 3600)),
    m: pad(Math.floor((left % 3600) / 60)),
    s: pad(left % 60),
    total: left,
  }
}
