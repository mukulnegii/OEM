from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
import os
from model import predict_vehicle_health

app = FastAPI()

API_KEY = os.getenv("API_KEY")

class VehicleInput(BaseModel):
    engine: float
    bearing: float
    stress: float

@app.post("/predict")
def predict(data: VehicleInput, x_api_key: str = Header(None)):
    if not x_api_key or x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")

    return predict_vehicle_health(
        data.engine,
        data.bearing,
        data.stress
    )