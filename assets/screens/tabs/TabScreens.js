import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useLayoutEffect } from "react";
import { Text } from "react-native";
import {moderateScale} from 'react-native-size-matters'
import Dashboard from "../tabs/Dashboard";
import AllTransactionScreen from "../tabs/AllTransactionScreen";
import AllClientScreen from "../tabs/AllClientScreen";
import {Ionicons} from "@expo/vector-icons"
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
      <tabs.Screen options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        )
      }} name="Dashboard" component={Dashboard} />

      <tabs.Screen options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-people-outline" size={size} color={color} />
        )
      }} name="AllClients" component={AllClientScreen} />

      <tabs.Screen options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="wallet-outline" size={size} color={color} />
        )
      }} name="TransactionScreen" component={AllTransactionScreen} />
    </tabs.Navigator>
  );
};
export default TabScreens;
