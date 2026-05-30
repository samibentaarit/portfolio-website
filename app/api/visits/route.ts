import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null
const VISIT_KEY = "portfolio:visits"

export async function GET() {
  if (!redis) {
    return NextResponse.json({ visits: null, enabled: false })
  }

  const visits = await redis.get<number>(VISIT_KEY)
  return NextResponse.json({ visits: visits ?? 0, enabled: true })
}

export async function POST() {
  if (!redis) {
    return NextResponse.json({ visits: null, enabled: false })
  }

  const visits = await redis.incr(VISIT_KEY)
  return NextResponse.json({ visits, enabled: true })
}