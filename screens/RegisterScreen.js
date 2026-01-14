import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Registration Screen (To be implemented)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 18,
    color: COLORS.textDark,
  },
});
