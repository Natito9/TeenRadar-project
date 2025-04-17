import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import apiRoutes from "./routes/api.js";
import {
  fetchSchools,
  getSchoolsCoordinates,
  insertSchools,
} from "./helpers/skolverket/skolverketHelpers.js";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("teenRadar");
    const schoolDataColl = db.collection("SchoolsData");

    let schoolsData;
    const existingSchoolData = await schoolDataColl.findOne();

    if (existingSchoolData) {
      console.log("SchoolsData already exists, fetch skipped.");
      return;
    } else {
      schoolsData = await fetchSchools();
      // console.log("Fetched schools:", schoolsData.length);
      await schoolDataColl.insertOne({ schools: schoolsData });
    }

    for (const school of schoolsData) {
      const unitCode = school.schoolUnitCode;
      const schoolName = school.name;

      const response = await getSchoolsCoordinates(unitCode);

      if (response && response.coords) {
        const { coords } = response;
        // console.log("Inserting school:", schoolName);
        await insertSchools(db, unitCode, coords, schoolName);
      } else {
        console.warn(`No coordinates for ${unitCode}`);
      }
    }
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
app.listen(PORT, () => {
  // console.log(`Server running on http://localhost:${PORT}`);
});
