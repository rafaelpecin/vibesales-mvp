"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [url, setUrl] = useState("")
  const router = useRouter()

  const handleAnalyze = async () => {
    localStorage.setItem("url", url)

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })

    router.push("/analyze/results")
  }

  return (
    <div>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://example.com"
      />

      <button type="button" onClick={handleAnalyze}>
        Analyze
      </button>
    </div>
  )
}
