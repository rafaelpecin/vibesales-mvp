import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Results() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const url = localStorage.getItem("url")

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
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

      <button
        onClick={() => {
          try {
            const analysisObj =
              typeof data.analysis === "string"
                ? JSON.parse(data.analysis)
                : data.analysis
            if (
              analysisObj?.product_type &&
              analysisObj?.primary_topic &&
              analysisObj?.language
            ) {
              localStorage.setItem(
                "analyze_result",
                JSON.stringify(analysisObj)
              )
              router.push("/seo-suggestions")
            } else {
              alert(
                "Analysis missing required fields (product_type, primary_topic, language). Please try again."
              )
            }
          } catch (e) {
            alert("Failed to parse analysis. Please try analyzing again.")
          }
        }}
      >
        Get SEO Suggestions
      </button>

      <button onClick={() => location.href = "/ads"}>
        Skip to Ads
      </button>
    </div>
  )
}
