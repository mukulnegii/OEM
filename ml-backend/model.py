import joblib

model_data = joblib.load("model.pkl")

weights = model_data["weights"]
thresholds = model_data["risk_thresholds"]
dtc_rules = model_data["dtc_rules"]

def predict_vehicle_health(engine: float, bearing: float, stress: float):
    """
    engine, bearing, stress values must be between 0 and 1
    """

    # Weighted risk score
    risk_score = (
        engine * weights["engine"] +
        bearing * weights["bearing"]
    )

    # Risk classification
    if risk_score < thresholds["healthy"]:
        risk_level = "Healthy"
    elif risk_score < thresholds["warning"]:
        risk_level = "Warning"
    else:
        risk_level = "Critical"

    # DTC detection
    dtc_codes = []

    if engine >= dtc_rules["engine"]["threshold"]:
        dtc_codes.append(dtc_rules["engine"]["code"])

    if bearing >= dtc_rules["bearing"]["threshold"]:
        dtc_codes.append(dtc_rules["bearing"]["code"])

    if stress >= dtc_rules["stress"]["threshold"]:
        dtc_codes.append(dtc_rules["stress"]["code"])

    return {
        "risk_score": round(risk_score, 3),
        "risk_level": risk_level,
        "dtc_codes": dtc_codes
    }
