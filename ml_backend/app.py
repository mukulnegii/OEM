from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import joblib
from scipy.special import expit

app = FastAPI(title="Vehicle Health Prediction API")

# -------------------------------
# Load model artifacts
# -------------------------------
bundle = joblib.load("model.pkl")
scaler = bundle["scaler"]
FEATURE_RANGES = bundle["feature_ranges"]

FEATURE_ORDER = [
    "engine_temperature",
    "oil_pressure",
    "vibration_level",
    "rpm",
    "harsh_braking_count",
    "harsh_acceleration_count"
]

# -------------------------------
# Request schema
# -------------------------------
class VehicleInput(BaseModel):
    engine_temperature: float
    oil_pressure: float
    vibration_level: float
    rpm: float
    harsh_braking_count: int
    harsh_acceleration_count: int

# -------------------------------
# Validation
# -------------------------------
def validate_input(data: dict):
    for key, (low, high) in FEATURE_RANGES.items():
        if key not in data:
            raise ValueError(f"Missing input: {key}")
        if not (low <= data[key] <= high):
            raise ValueError(f"{key} out of range ({low}–{high})")

# -------------------------------
# Prediction endpoint
# -------------------------------
@app.post("/predict")
def predict(data: VehicleInput):
    try:
        input_dict = data.dict()
        validate_input(input_dict)

        # Arrange inputs in correct order
        features = np.array([[input_dict[f] for f in FEATURE_ORDER]])
        norm = scaler.transform(features)[0]

        temp, oil, vibration, rpm, braking, acceleration = norm

        # Engine failure probability
        engine_risk = (
            1.8 * temp +
            2.2 * (1 - oil) +
            1.5 * rpm
        )
        engine_failure_probability = float(expit(engine_risk))

        # Bearing failure probability
        bearing_risk = (
            2.5 * vibration +
            1.7 * rpm +
            1.2 * temp
        )
        bearing_failure_probability = float(expit(bearing_risk))

        # Driving stress index (0–100)
        stress_score = (
            0.4 * braking +
            0.4 * acceleration +
            0.2 * rpm
        )
        driving_stress_index = int(min(stress_score * 100, 100))

        # ✅ ONLY the 3 outputs your app needs
        return {
            "engine_failure_probability": round(engine_failure_probability, 3),
            "bearing_failure_probability": round(bearing_failure_probability, 3),
            "driving_stress_index": driving_stress_index
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")
