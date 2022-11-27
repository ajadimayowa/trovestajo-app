import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useLayoutEffect } from "react";
import { Text } from "react-native";
import Dashboard from "../tabs/Dashboard"
import AllClientScreens from "../tabs/AllClientScreen"
import AgentBioScreen from "../tabs/AgentBioScreen"
const tabs = createBottomTabNavigator();

const TabScreens = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <tabs.Navigator>
      <tabs.Screen name="Dashboard" component={Dashboard}/>
      <tabs.Screen name="AllClients" component={AllClientScreens} />
      <tabs.Screen name="AgentBio" component={AgentBioScreen} />
    </tabs.Navigator>
  );
};
export default TabScreens;
