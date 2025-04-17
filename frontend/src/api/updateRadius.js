export const updateRadius = async (newRadius) => {
    const res = await fetch("http://localhost:3001/radiusSettings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ radius: newRadius }),
    });
  
    if (!res.ok) {
      throw new Error("Failed to update radius");
    }
  
    return res.json();
  };