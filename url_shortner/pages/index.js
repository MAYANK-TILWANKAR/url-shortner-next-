import { useState } from 'react';
import fetch from 'node-fetch'; // You might need to install node-fetch if not already available

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();
    setShortenedUrl(data.shortenedUrl);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten"
        />
        <button type="submit">Shorten</button>
      </form>
      {shortenedUrl && <p><a href={shortenedUrl}>{shortenedUrl}</a></p>}
    </div>
  );
}
