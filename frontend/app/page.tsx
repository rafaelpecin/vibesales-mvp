"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  return (
    <main>
      <h1>Analyze your website</h1>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://example.com"
      />
      <button onClick={() => router.push(`/analyze?url=${encodeURIComponent(url)}`)}>
        Analyze
      </button>
    </main>
  );
}
