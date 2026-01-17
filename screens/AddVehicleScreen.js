import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants/colors";

export default function AddVehicleScreen() {
  const [step, setStep] = useState(1);

  const [vehicleName, setVehicleName] = useState("");
  const [regOrEngine, setRegOrEngine] = useState("");
  const [imageUri, setImageUri] = useState(null);

  // 📸 Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveVehicle = async () => {
    if (!vehicleName || !regOrEngine || !imageUri) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const stored = await AsyncStorage.getItem("VEHICLES");
    const vehicles = stored ? JSON.parse(stored) : [];

    const newVehicle = {
      id: Date.now().toString(),
      name: vehicleName,
      regOrEngine,
      imageUri, // 🔥 used ONLY by HomeScreen
    };

    await AsyncStorage.setItem(
      "VEHICLES",
      JSON.stringify([...vehicles, newVehicle])
    );

    Alert.alert("Success", "Vehicle added successfully");
    setStep(1);
    setVehicleName("");
    setRegOrEngine("");
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Vehicle</Text>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <TextInput
            placeholder="Vehicle Name"
            value={vehicleName}
            onChangeText={setVehicleName}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (!vehicleName) {
                Alert.alert("Error", "Enter vehicle name");
                return;
              }
              setStep(2);
            }}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <TextInput
            placeholder="Registration / Engine Number"
            value={regOrEngine}
            onChangeText={setRegOrEngine}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (!regOrEngine) {
                Alert.alert("Error", "Enter registration or engine number");
                return;
              }
              setStep(3);
            }}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Text>Select Car Image from Gallery</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={saveVehicle}>
            <Text style={styles.btnText}>Save Vehicle</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  imageBox: {
    height: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
