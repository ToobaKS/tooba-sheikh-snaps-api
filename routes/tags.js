import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const DATA_FILE = path.resolve("./data/tags.json");

function readTags() {
  try {
    const tagsData = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(tagsData);
  } catch (error) {
    console.error("Error reading tags data:", error);
    throw new Error("Failed to load tags data.");
  }
}

router.get("/tags", (req, res) => {
  try {
    const tags = readTags();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
