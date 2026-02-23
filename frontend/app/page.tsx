import Image from "next/image";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/health`,
    { cache: "no-store" }
  )
  const data = await res.json()

  return (
    <main style={{ padding: 40 }}>
      <h1>SEO & Ads AI</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}

