import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth } from "../firebase";
import {
  signInWithPhoneNumber,
  signInWithEmailLink,
  RecaptchaVerifier,
} from "firebase/auth";
import { COLORS } from "../constants/colors";

export default function LoginScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [step, setStep] = useState(1);

  const isPhone = /^\+?[0-9]{10,15}$/.test(input);
  const isEmail = /\S+@\S+\.\S+/.test(input);

  const sendOTP = async () => {
    try {
      if (isPhone) {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          input
        );
        setConfirmation(confirmationResult);
        setStep(2);
      } else if (isEmail) {
        await signInWithEmailLink(auth, input, {
          url: "https://automind.app/login",
          handleCodeInApp: true,
        });
        Alert.alert("Check Email", "OTP link sent to your email");
      } else {
        Alert.alert("Invalid Input", "Enter phone or email");
      }
    } catch (err) {
      Alert.alert("OTP Error", err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmation.confirm(otp);
      navigation.replace("Home");
    } catch (err) {
      Alert.alert("Invalid OTP", err.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Login to AutoMind
      </Text>

      {step === 1 && (
        <>
          <TextInput
            placeholder="Phone or Email"
            value={input}
            onChangeText={setInput}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 14,
              marginBottom: 15,
            }}
          />

          <TouchableOpacity
            onPress={sendOTP}
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Send OTP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 20 }}
          >
            <Text style={{ color: COLORS.primary, textAlign: "center" }}>
              New user? Register
            </Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <TextInput
            placeholder="Enter OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 14,
              marginBottom: 15,
            }}
          />

          <TouchableOpacity
            onPress={verifyOTP}
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Verify OTP
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
