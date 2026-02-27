"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SeoSuggestionsPage() {
  const router = useRouter()
  const [topics, setTopics] = useState<any[]>([])

  /*
  useEffect(() => {
    const url = localStorage.getItem("url")
    if (!url) {
      router.push("/")
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo-suggestions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => setTopics(data.topics || []))
  }, [router])
*/
/*
useEffect(() => {
  const url = localStorage.getItem("url")
  console.log("Stored URL:", url)

  if (!url) {
    router.push("/")
    return
  }

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo-suggestions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  })
    .then(async (res) => {
      console.log("Response status:", res.status)
      const json = await res.json()
      console.log("Response JSON:", json)
      return json
    })
    .then((data) => {
      setTopics(data.topics || [])
    })
    .catch((err) => {
      console.error("Fetch error:", err)
    })
  }, [router])
  */
 useEffect(() => {
  const raw = localStorage.getItem("analyze_result")

  if (!raw) {
    console.error("No analyze result found")
    router.push("/")
    return
  }

  const analyzeResult = JSON.parse(raw)

  console.log("Analyze result:", analyzeResult)
  const j = JSON.stringify({
      //url: analyzeResult.url,
      product_type: analyzeResult.product_type,
      primary_topic: analyzeResult.primary_topic,
      language: analyzeResult.language,
    })
  console.log("Parsed analyzeResult: ", raw)

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo-suggestions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw
       //body: JSON.stringify({
      //url: analyzeResult.url,
      //product_type: analyzeResult.product_type,
      //primary_topic: analyzeResult.primary_topic,
      //language: analyzeResult.language,
   //}),
  })
}, [router])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">SEO Suggestions</h1>

      <ul className="mt-4">
        {topics.map((t, i) => (
          <li key={i}>{t.title}</li>
        ))}
      </ul>
    </main>
  )
}