import { calculateDistance } from "../calculations/calculateDistance.js";
import { MongoClient } from "mongodb";

export async function scanNearbySchools(userLat, userLong, radius = 2) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("teenRadar");
    const schoolLocationsColl = db.collection("SchoolsLocations");

    const schoolLocations = await schoolLocationsColl.find().toArray();
    //checking that all the schools have valid location
    const validSchools = schoolLocations.filter((school) => {
      return (
        school.latitude &&
        school.longitude &&
        !isNaN(parseFloat(school.latitude)) &&
        !isNaN(parseFloat(school.longitude))
      );
    });

    const nearbySchools = validSchools
      .map((school) => {
        const schoolLat = parseFloat(school.latitude);
        const schoolLong = parseFloat(school.longitude);
        const userLatNum = parseFloat(userLat);
        const userLongNum = parseFloat(userLong);

        const distance = calculateDistance(
          userLatNum,
          userLongNum,
          schoolLat,
          schoolLong
        );
        return {
          ...school,
          distance,
        };
      })
      .filter((school) => school.distance <= radius);

    return nearbySchools;
  } finally {
    await client.close();
  }
}
