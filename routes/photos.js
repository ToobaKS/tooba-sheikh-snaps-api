import express from 'express';
import fs from 'fs';

const router = express.Router();

function readPhotos() {
  const photosData = fs.readFileSync("./data/photos.json");
  const parsedData = JSON.parse(photosData);
  return parsedData;
}

router.get('/photos', (req, res) =>{
    const photos = readPhotos();
    res.json(photos);
})

export default router;