export async function predictVehicleHealth(input) {
  const response = await fetch(
    "https://your-render-service.onrender.com/predict",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.EXPO_PUBLIC_API_KEY
      },
      body: JSON.stringify(input)
    }
  );

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}
