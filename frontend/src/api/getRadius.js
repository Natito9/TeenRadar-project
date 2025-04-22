const API_URL = import.meta.env.VITE_API_URL;
export const getRadius = async () => {
    const res =await fetch(`${API_URL}/radiusSettings`, {
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