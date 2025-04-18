import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import apiRoutes from "./routes/api.js";
import { updateSchoolData } from "./helpers/dataBase/updateSchoolData.js";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("teenRadar");
    await updateSchoolData(db);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

const app = express();
app.use(express.json());
app.use(cors());
app.use(apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running! " });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {});
