import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

function getPhotos() {
  const photosData = fs.readFileSync("./data/photos.json");
  const parsedData = JSON.parse(photosData);
  return parsedData;
}

function getPhotoById(id) {
  const photos = getPhotos();
  return photos.find((photo) => photo.id === id);
}

router.get("/photos", (req, res) => {
  const photos = getPhotos();
  res.json(photos);
});

router.get("/photos/:id", (req, res) => {
  const id = req.params.id;
  const photo = getPhotoById(id);
  res.json(photo);
});

router.get("/photos/:id/comments", (req, res) => {
  const id = req.params.id;
  const photo = getPhotoById(id);
  res.json(photo.comments);
});

router.post("/photos/:id/comments", (req, res) => {
  const id = req.params.id;
  const { name, comment } = req.body;
  const photos = getPhotos();

  if (!name || !comment) {
    res.status(404).json({ error: "Invalid name and id" });
  }

  const newComment = {
    id: uuidv4(),
    name,
    comment,
    timestamp: Date.now(),
  };

  const photoIndex = photos.findIndex((photo) => photo.id === id);

  if (photoIndex !== -1) {
    photos[photoIndex].comments.push(newComment);
    fs.writeFileSync("./data/photos.json", JSON.stringify(photos, null, 2));
    res.json(newComment);
  } else {
    res.status(404).json({ error: "Photo not found" });
  }
});

export default router;
