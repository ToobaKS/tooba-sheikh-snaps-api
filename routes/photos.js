import express from "express";
import fs from "fs";

const router = express.Router();

function readPhotos() {
  const photosData = fs.readFileSync("./data/photos.json");
  const parsedData = JSON.parse(photosData);
  return parsedData;
}

function getPhotoById(id) {
  const photos = readPhotos();
  return photos.find((photo) => photo.id === id);
}

router.get("/photos", (req, res) => {
  const photos = readPhotos();
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

export default router;
