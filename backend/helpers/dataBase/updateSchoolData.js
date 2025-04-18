import { fetchSchools, getSchoolsCoordinates, insertSchools } from "../skolverket/skolverketHelpers.js";

export async function updateSchoolData(db) {
  const schoolDataColl = db.collection("SchoolsData");
  const existingSchoolData = await schoolDataColl.findOne();
  const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

  if (
    existingSchoolData &&
    new Date() - new Date(existingSchoolData.lastUpdated) < THIRTY_DAYS
  ) {
    console.log(" Using fetched school data.");
    return;
  }

  const schoolsData = await fetchSchools();

  await schoolDataColl.updateOne(
    {},
    { $set: { schools: schoolsData, lastUpdated: new Date() } },
    { upsert: true }
  );

  for (const school of schoolsData) {
    const unitCode = school.schoolUnitCode;
    const schoolName = school.name;

    const response = await getSchoolsCoordinates(unitCode);

    if (response && response.coords) {
      const { coords } = response;
      await insertSchools(db, unitCode, coords, schoolName);
    } else {
      console.warn(`No coordinates for ${unitCode}`);
    }
  }
}
