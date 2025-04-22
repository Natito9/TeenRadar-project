const API_URL = import.meta.env.VITE_API_URL;

export const scanLocation = async (location) => {
    const res = await fetch(`${API_URL}/scan`, {
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