import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../assets/screens/LoginScreen';
import TabScreens from '../assets/screens/tabs/TabScreens';
import ClientDetailScreen from '../assets/screens/stacks/ClientDetailScreen';
import ClientRegScreen from '../assets/screens/modals/ClientRegScreen';
import DepositThriftScreen from '../assets/screens/stacks/DepositThriftScreen';


const stack = createNativeStackNavigator()
export default function Stacknavigation() {
    return (
        <stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
        }}>
            <stack.Screen name="Login" component={LoginScreen} />
            <stack.Screen name="Main" component={TabScreens} />
            <stack.Screen name='RegNewClient' component={ClientRegScreen}/>
            <stack.Screen name='ClientDetailScreen' component={ClientDetailScreen}/>
            <stack.Screen name='DepositThriftScreen' component={DepositThriftScreen}/>
        </stack.Navigator>
    )
}
