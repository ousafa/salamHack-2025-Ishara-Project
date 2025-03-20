import express from "express";
import multer from "multer";
import Tesseract from "tesseract.js";
import cors from "cors";

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Upload and extract text
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  try {
    const {
      data: { text },
    } = await Tesseract.recognize(req.file.buffer, "eng");
    res.json({ extractedText: text });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error processing image");
  }
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
