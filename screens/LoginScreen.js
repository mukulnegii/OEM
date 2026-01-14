import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function LoginScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* 🔵 LOGO CIRCLE */}
      <View
        style={{
          alignSelf: "center",
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: "#E6F4FE",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
          elevation: 4,
        }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 90, height: 90, resizeMode: "contain" }}
        />
      </View>

      {/* 📱 PHONE / EMAIL */}
      <TextInput
        placeholder="Phone number or Email"
        placeholderTextColor={COLORS.textMuted}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 14,
          marginBottom: 15,
          backgroundColor: "#fff",
        }}
      />

      {/* 🔐 OTP */}
      <TextInput
        placeholder="Enter Password"
        placeholderTextColor={COLORS.textMuted}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 14,
          marginBottom: 10,
          backgroundColor: "#fff",
        }}
      />

      {/* 📝 REGISTER */}
      <TouchableOpacity onPress={() => navigation.navigate("Register|Forgot Password")}>
        <Text
          style={{
            color: COLORS.primary,
            textAlign: "right",
            marginBottom: 25,
            fontWeight: "500",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>

      {/* 🔘 LOGIN BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.replace("MainApp")}
        style={{
          backgroundColor: COLORS.primary,
          padding: 16,
          borderRadius: 12,
          elevation: 3,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
