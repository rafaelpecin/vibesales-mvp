import { useEffect, useState } from "react"

export default function SEO() {
  const [result, setResult] = useState<string>("")

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/seo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: localStorage.getItem("analysis")!
    })
      .then(res => res.text())
      .then(setResult)
  }, [])

  return (
    <div>
      <h1>SEO Suggestions</h1>

      <pre>{result}</pre>

      <button onClick={() => location.href = "/analyze"}>
        Scan Again
      </button>

      <button onClick={() => location.href = "/ads"}>
        Skip to Ads
      </button>
    </div>
  )
}
