import { useState } from "react";
import Head from "next/head";
import QrCodeGenerator from "@/components/QrCodeGenerator";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });
    const data = await res.json();
    setShortUrl(`${window.location.origin}/${data.shortUrl}`);
  };

  const handleCSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/custom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl, customUrl }),
    });
    const data = await res.json();
    setCustomUrl(`${window.location.origin}/c/${data.customUrl}`);
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black flex items-center justify-center">
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          URL Shortener
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="url"
              placeholder="Enter the original URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Shorten
          </button>
        </form>

        <br />

        <form onSubmit={handleCSubmit}>
          <div className="mb-4">
            <input
              type="url"
              placeholder="Enter the original URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter custom short URL (optional)"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Customize
          </button>
        </form>
        <br />
        <QrCodeGenerator />

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">
              Shortened URL:{" "}
              <a href={shortUrl} className="text-indigo-500 hover:underline">
                {shortUrl}
              </a>
            </p>
          </div>
        )}
        {customUrl && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">
              Customized-URL:{" "}
              <a href={customUrl} className="text-indigo-500 hover:underline">
                {customUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
