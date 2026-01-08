import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Alert } from "react-native";

import AboutScreen from "../screens/AboutScreen";
import ContactScreen from "../screens/ContactScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VehicleScreen from "../screens/VehicleScreen";
import BottomTabs from "./BottomTabs";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      
      <Drawer.Screen name="Home" component={BottomTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Vehicle" component={VehicleScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />

      {/* 🔴 LOGOUT WITH CONFIRMATION */}
      <Drawer.Screen
        name="Logout"
        component={BottomTabs} // dummy
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault(); // stop navigation

            Alert.alert(
              "Logout",
              "Cancel or Confirm?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Confirm",
                  style: "destructive",
                  onPress: async () => {
                    await AsyncStorage.clear();

                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Login" }],
                    });
                  },
                },
              ]
            );
          },
        }}
        options={{
          drawerLabelStyle: {
            color: "#DC2626",
            fontWeight: "600",
          },
        }}
      />

    </Drawer.Navigator>
  );
}
