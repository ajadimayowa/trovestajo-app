import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useLayoutEffect } from "react";
import { Text } from "react-native";
import {moderateScale} from 'react-native-size-matters'
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
          height: moderateScale(62),
        },
        headerShown: false
      }}
    >
      <tabs.Screen name="Dashboard" component={Dashboard} />
      <tabs.Screen name="AllClients" component={AllClientScreen} />
      <tabs.Screen name="TransactionScreen" component={AllTransactionScreen} />
    </tabs.Navigator>
  );
};
export default TabScreens;
