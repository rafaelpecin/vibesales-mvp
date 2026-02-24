import { useEffect, useState } from "react"

export default function Results() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const url = localStorage.getItem("url")

    fetch("http://localhost:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <p>Analyzing...</p>

  return (
    <div>
      <h1>Analyzer Results</h1>

      <label>Title</label>
      <input defaultValue={data.title} />

      <label>Description</label>
      <textarea defaultValue={data.description} />

      <pre>{data.analysis}</pre>

      <button onClick={() => location.href = "/seo"}>
        Get SEO Suggestions
      </button>

      <button onClick={() => location.href = "/ads"}>
        Skip to Ads
      </button>
    </div>
  )
}
