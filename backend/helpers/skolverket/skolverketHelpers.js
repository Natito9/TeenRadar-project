export const fetchSchools = async () => {
  try {
    const response = await fetch(
      "https://api.skolverket.se/skolenhetsregistret/v2/school-units?school_type=GY&status=AKTIV&school_unit_type=SKOLENHET"
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch school data. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data.data.attributes;
  } catch (error) {
    console.error("Error fetching schools:", error);
    return [];
  }
};

export const getSchoolsCoordinates = async (unitCodes) => {
  const response = await fetch(
    `https://api.skolverket.se/skolenhetsregistret/v2/school-units/${unitCodes}`
  );

  if (!response.ok) {
    console.warn(`Failed for unit code ${unitCodes}, skipping...`);
    return null;
  }

  const schoolDetails = await response.json();

  const coords =
    schoolDetails?.data?.attributes?.addresses?.[0]?.geoCoordinates;

  if (!coords || !coords.latitude || !coords.longitude) {
    return null;
  }
  // console.log(`Fetched coords for:(${unitCodes})`);

  return { coords };
};

export const insertSchools = async (db, unitCode, coords, schoolName) => {
  const schoolLocationsColl = db.collection("SchoolsLocations");
  await schoolLocationsColl.insertOne({
    schoolName: schoolName,
    schoolUnitCode: unitCode,
    latitude: coords.latitude,
    longitude: coords.longitude,
  });
};
