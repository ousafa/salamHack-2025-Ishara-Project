import express from "express";
import multer from "multer";
import Tesseract from "tesseract.js";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors({
  origin: 'https://ousafa.github.io/salamHack-2025-Ishara-Project/'
}));
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload and extract text
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  try {
    const {
      data: { text },
    } = await Tesseract.recognize(req.file.buffer, "eng");
    res.json({ extractedText: text });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing image");
  }
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);