import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { COLORS } from "../constants/colors";
import HelpDeskScreen from "../screens/HelpDeskScreen";
import HomeScreen from "../screens/HomeScreen";
import RecordScreen from "../screens/RecordScreen";
import SearchScreen from "../screens/SearchScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarStyle: {
      height: 110,        // 🔥 increase height (default ~50)
      paddingBottom: 25, // 🔥 space from bottom
      paddingTop: 1,    // 🔥 space from top
    },
  }}
>

<Tab.Screen
  name="Records"
  component={RecordScreen}
  options={{ tabBarIcon: () => <Text style={{ color: COLORS.primary }}>📑</Text> }}
/>

<Tab.Screen
  name="Search"
  component={SearchScreen}
  options={{ tabBarIcon: () => <Text style={{ color: COLORS.primary }}>🔍</Text> }}
/>

<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{ tabBarIcon: () => <Text style={{ color: COLORS.primary }}>🏠</Text> }}
/>

<Tab.Screen
  name="Schedule"
  component={ScheduleScreen}
  options={{ tabBarIcon: () => <Text style={{ color: COLORS.primary }}>🗓️</Text> }}
/>

<Tab.Screen
  name="HelpDesk"
  component={HelpDeskScreen}
  options={{ tabBarIcon: () => <Text style={{ color: COLORS.primary }}>🆘</Text> }}
/>
    </Tab.Navigator>
  );
}
