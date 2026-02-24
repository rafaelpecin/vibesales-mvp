import { useEffect, useState } from "react"

export default function Ads() {
  const [ads, setAds] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: localStorage.getItem("analysis")!
    })
      .then(res => res.text())
      .then(setAds)
  }, [])

  return (
    <div>
      <h1>Ads</h1>
      <pre>{ads}</pre>
    </div>
  )
}
