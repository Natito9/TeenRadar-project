export const getRadius = async () => {
    const res = await fetch("http://localhost:3001/radiusSettings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch radius");
    }
  
    return res.json();
  };