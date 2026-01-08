import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput placeholder="Phone Number" style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} />

      <TouchableOpacity>
        <Text style={{ color: "blue", marginBottom: 20 }}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.replace("MainApp")}
        style={{ backgroundColor: "#4CAF50", padding: 15 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
