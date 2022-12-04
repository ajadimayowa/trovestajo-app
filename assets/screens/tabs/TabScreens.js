import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useLayoutEffect } from "react";
import { Text } from "react-native";
import Dashboard from "../tabs/Dashboard";
import AllTransactionScreen from "../tabs/AllTransactionScreen";
import AllClientScreen from "../tabs/AllClientScreen";
const tabs = createBottomTabNavigator();

const TabScreens = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#958D8D",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#01065B",
          height: 62,
        },
      }}
    >
      <tabs.Screen name="Dashboard" component={Dashboard} />
      <tabs.Screen name="AllClients" component={AllClientScreen} />
      <tabs.Screen name="AgentBio" component={AllTransactionScreen} />
    </tabs.Navigator>
  );
};
export default TabScreens;
