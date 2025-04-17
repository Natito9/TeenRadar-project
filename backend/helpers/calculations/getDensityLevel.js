export function getDensityLevel(schoolCount) {
    let densityLevel
    let message;
  
    switch (true) {
      case (schoolCount <= 2):
        densityLevel = "Low";
        message = "Low teen presence, stay alert, they're sneaky!";
        break;
      case (schoolCount <= 10):
        densityLevel = "Medium";
        message = "Medium teen presence. Be carefully, they travel in groups.";
        break;
      default:
        densityLevel = "High";
        message = "High teen presence. You might hear TikTok sounds and loud laughs.";
        break;
    }
  
    return {densityLevel, message};
  }