"use client"

import { useEffect, useState } from "react"

type VisitResponse = {
  visits: number | null
  enabled: boolean
}

export function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const syncVisits = async () => {
      try {
        const response = await fetch("/api/visits", {
          method: "POST",
          cache: "no-store",
          signal: controller.signal,
        })

        if (!response.ok) return

        const data = (await response.json()) as VisitResponse
        setVisits(data.visits)
        setEnabled(data.enabled)
      } catch {
        setVisits(null)
      }
    }

    syncVisits()
    return () => controller.abort()
  }, [])

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-white shadow-[0_0_24px_rgba(6,182,212,0.12)] backdrop-blur-md">
      <span className="flex h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(6,182,212,0.85)]" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">Visits</span>
      <span className="font-black tabular-nums text-sm leading-none text-white">
        {visits ?? 0}
      </span>
      {enabled ? null : <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">dev</span>}
    </div>
  )
}