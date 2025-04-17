import express from "express";
import { scanNearbySchools } from "../helpers/dataBase/scanNearbySchools.js";
import { getDensityLevel } from "../helpers/calculations/getDensityLevel.js";
import { isSchoolTime } from "../helpers/calculations/isSchoolTime.js";
import { getRadius, setRadius } from "../helpers/settings/radiusSetting.js";
const router = express.Router();


router.get("/", (req, res) => {
  res.json({ message: "Backend is running " });
});


router.get("/radiusSettings", async (req, res) => {
  const currentRadius = getRadius();
  if (currentRadius == null) {
    return res.status(404).json({ message: "Radius setting not found" });
  }
  if (typeof currentRadius !== 'number' || isNaN(currentRadius) || currentRadius < 1 || currentRadius > 50) {
    return res.status(400).json({ error: 'Invalid radius. Must be a number between 1 and 50.' });
  }
  res.status(200).json({ 
    radius: currentRadius,
    message: "Current scan radius fetched successfully"
  });
});


router.put("/radiusSettings", async (req, res) => {
  const { radius } = req.body;

  if (radius === undefined || isNaN(radius)) {
    return res.status(400).json({ message: "Invalid radius" });
  }

  setRadius(Number(radius));
  res.status(200).json({ message: "Radius updated", radius: Number(radius) });
});


router.post("/scan", async (req, res) => {

  const { latitude, longitude } = req.body;
  const userLat = parseFloat(latitude);
  const userLong = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLong)) {
    return res.status(400).json({ message: "Invalid or missing coordinates" });
  }

  try {
    const radiusToScan = getRadius() || 1;
    const nearbySchools = await scanNearbySchools(
      userLat,
      userLong,
      radiusToScan
    );

    const count = nearbySchools.length;

    const { densityLevel, message } = isSchoolTime()
    ? { densityLevel: "Low", message: "Low chances of teen sightings. They are hopefully in class." }
    : getDensityLevel(count);

    res.status(200).json({
      count,
      densityLevel,
      levelMessage: message,
      schoolNames: nearbySchools.map((school) => school.schoolName),
    });
  } catch (err) {
    console.error("Error fetching nearby schools:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
