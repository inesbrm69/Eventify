const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

// Dossier uploads
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "-").toLowerCase();
    const filename = `${name}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// Route d'upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier reçu." });
  }

  return res.status(200).json({
    image: req.file.filename
  });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur d'upload lancé sur http://localhost:${PORT}`);
});
