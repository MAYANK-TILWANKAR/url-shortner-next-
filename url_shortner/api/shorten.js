import { addUrl } from '../urls';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { originalUrl } = req.body;
    const shortenedUrl = shortenUrl(originalUrl);
    await addUrl(originalUrl, shortenedUrl);

    res.status(200).json({ originalUrl, shortenedUrl });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
