import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import "dotenv/config";
import tags from "./routes/tags.js";
import photos from "./routes/photos.js";

const app = express();
const port = process.env.PORT || process.argv[2] || 8080;

app.use(express.json());

const { CORS_ORIGIN } = process.env;
app.use(cors({ origin: CORS_ORIGIN }));

app.get("/tags", tags);
app.get("/photos", photos);
app.get("/photos/:id", photos);
app.get("/photos/:id/comments", photos);
// app.get("/photos", photos);

// app.post("/api/v1/students", (req, res) => {
//   const { name, program, grade } = req.body;
//   const newStudent = {
//     id: uuidv4(),
//     name,
//     program,
//     grade,
//   };
//   students.push(newStudent);
//   res.json(newStudent);
// });

app.listen(port, () => console.log(`Listening on ${port}`));
