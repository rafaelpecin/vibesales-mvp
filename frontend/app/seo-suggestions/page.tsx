"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Topic = {
  topic: string
  keywords: string[]
  intent: string
}

export default function SEOSuggestions() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const router = useRouter()

  useEffect(() => {
    const raw = localStorage.getItem("analyze_result")
    if (!raw) {
      router.push("/")
      return
    }
    const analysis = JSON.parse(raw)
    if (!analysis?.product_type || !analysis?.primary_topic || !analysis?.language) {
      router.push("/")
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo-suggestions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(analysis)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to get SEO suggestions")
        return res.json()
      })
      .then(data => setTopics(JSON.parse(data.suggestions)))
      .catch(() => router.push("/"))
  }, [router])

  const toggle = (index: number) => {
    setSelected(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const continueToAds = () => {
    localStorage.setItem(
      "seo_topics",
      JSON.stringify(selected.map(i => topics[i]))
    )
    router.push("/ads")
  }

  return (
    <div>
      <h1>SEO Content Ideas</h1>

      {topics.map((t, i) => (
        <div key={i}>
          <input
            type="checkbox"
            checked={selected.includes(i)}
            onChange={() => toggle(i)}
          />
          <strong>{t.topic}</strong>
          <p>Intent: {t.intent}</p>
          <p>Keywords: {t.keywords.join(", ")}</p>
        </div>
      ))}

      <hr />

      <button onClick={() => router.push("/")}>
        Rescan website
      </button>

      <button onClick={continueToAds}>
        Skip rescan and create ads
      </button>
    </div>
  )
}
