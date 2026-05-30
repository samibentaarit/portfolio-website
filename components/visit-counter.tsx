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
    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.08)]">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary/80">Live visits</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-white">
        {visits === null ? "—" : visits.toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-gray-300">
        {enabled
          ? "Counted through a server-side pageview counter."
          : "Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable counting."}
      </p>
    </div>
  )
}