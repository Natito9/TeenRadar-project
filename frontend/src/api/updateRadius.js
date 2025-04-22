const API_URL = import.meta.env.VITE_API_URL;
export const updateRadius = async (newRadius) => {
    const res = await fetch(`${API_URL}/radiusSettings`, {
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