export const scanLocation = async (location) => {
    const res = await fetch("http://localhost:3001/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
  
    if (!res.ok) {
      throw new Error("Failed to scan location");
    }
  
    return res.json();
  };