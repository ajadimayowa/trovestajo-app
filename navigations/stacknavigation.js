import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../assets/screens/LoginScreen';
import TabScreens from '../assets/screens/tabs/TabScreens';
import ClientRegScreen from '../assets/screens/modals/ClientRegScreen';


const stack = createNativeStackNavigator()
export default function Stacknavigation() {
    return (
        <stack.Navigator initialRouteName='Login'>
            <stack.Screen name="Login" component={LoginScreen} />
            <stack.Screen name="Main" component={TabScreens} />
            <stack.Screen name='RegNewClient' component={ClientRegScreen} />
        </stack.Navigator>
    )
}