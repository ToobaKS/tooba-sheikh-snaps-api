import express from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const DATA_FILE = path.resolve("./data/photos.json");

function getPhotos() {
  try {
    const photosData = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(photosData);
  } catch (error) {
    console.error("Error reading photos data:", error);
    throw new Error("Failed to load photos data.");
  }
}

function getPhotoById(id) {
  const photos = getPhotos();
  return photos.find((photo) => photo.id === id);
}

router.get("/photos", (req, res) => {
  try {
    const photos = getPhotos();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/photos/:id", (req, res) => {
  try {
    const id = req.params.id;
    const photo = getPhotoById(id);

    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }

    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/photos/:id/comments", (req, res) => {
  try {
    const id = req.params.id;
    const photo = getPhotoById(id);

    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }

    res.json(photo.comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/photos/:id/comments", (req, res) => {
  try {
    const id = req.params.id;
    const { name, comment } = req.body;

    if (!name?.trim() || !comment?.trim()) {
      return res
        .status(400)
        .json({ error: "Name and comment cannot be empty" });
    }

    const photos = getPhotos();
    const photo = photos.find((photo) => photo.id === id);

    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }

    const newComment = {
      id: uuidv4(),
      name: name.trim(),
      comment: comment.trim(),
      timestamp: Date.now(),
    };

    photo.comments.push(newComment);

    fs.writeFileSync(DATA_FILE, JSON.stringify(photos, null, 2));

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
