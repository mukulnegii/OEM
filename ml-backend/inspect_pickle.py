import joblib

data = joblib.load("model.pkl")
print(type(data))
print(data.keys())
