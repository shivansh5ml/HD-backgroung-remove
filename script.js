async function removeBg() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "
    },
    body: formData
  });

  const blob = await response.blob();
  const imgURL = URL.createObjectURL(blob);
  document.getElementById("resultImg").src = imgURL;
  document.getElementById("downloadBtn").href = imgURL;
}
import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/remove-bg", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("image_file", req.file.buffer, "image.png");
    formData.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_KEY
      },
      body: formData
    });

    const buffer = await response.arrayBuffer();
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: "Background remove failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

async function removeBg() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("http://localhost:3000/remove-bg", {
    method: "POST",
    body: formData
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  document.getElementById("resultImg").src = url;
  document.getElementById("downloadBtn").href = url;
}

