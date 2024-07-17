import connectToDatabase from "../../lib/mongoose";
import Url from "@/models/Url";
console.log("MONGODB_URI:", process.env.MONGODB_URI);

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "POST":
      try {
        const originalUrl = req.body.originalUrl;
        const customUrl = req.body.customUrl;
        const existingUrl = await Url.findOne({ originalUrl });

        if (existingUrl) {
          res.status(200).json(existingUrl);
        } else {
          const newUrl = new Url({ originalUrl, customUrl });
          await newUrl.save();
          res.status(201).json(newUrl);
        }
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
