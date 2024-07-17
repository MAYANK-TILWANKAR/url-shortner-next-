import mongoose from "mongoose";
import shortid from "shortid";

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  customUrl: {
    type: String,
  },
});

export default mongoose.models.Url || mongoose.model("Url", UrlSchema);
