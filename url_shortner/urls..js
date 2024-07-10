let urls = [];

export function getUrls() {
  return urls;
}

export function addUrl(originalUrl, shortenedUrl) {
  const id = Math.random().toString(36).substring(7);
  urls.push({ id, originalUrl, shortenedUrl });
}
function shortenUrl(originalUrl) {
    // Simple base64 encoding for demonstration purposes
    const encoded = Buffer.from(originalUrl).toString('base64');
    return `https://short.url/${encoded}`;
  }
  