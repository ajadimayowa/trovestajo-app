import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../assets/screens/LoginScreen';
import TabScreens from '../assets/screens/tabs/TabScreens';
import ClientDetailScreen from '../assets/screens/stacks/ClientDetailScreen';
import ClientRegScreen from '../assets/screens/modals/ClientRegScreen';
import DepositFundScreen from '../assets/screens/modals/DepositFundScreen';
import DepositCollectionScreen from '../assets/screens/modals/DepositCollectionScreen';
import AllTransactionScreen from '../assets/screens/tabs/AllTransactionScreen';
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

const stack = createNativeStackNavigator()
export default function Stacknavigation() {
    const { token } = useSelector((state) => state.agent);
    const [loginToken, setloginToken] = useState('')

    const getToken = async () => {
        const userToken = await AsyncStorage.getItem('@TRO_VEST_TOKEN')
        if (null) return
        setloginToken(userToken)

    }

    useEffect(() => {
        getToken()
    }, [])
    return (
        <stack.Navigator initialRouteName={loginToken ? 'Main' : 'Login'} screenOptions={{
            headerShown: false
        }}>
            <stack.Screen name="Login" component={LoginScreen} />
            <stack.Screen name="Main"  component={TabScreens} />
            <stack.Screen name='RegNewClient' component={ClientRegScreen} />
            <stack.Screen name='ClientDetailScreen' component={ClientDetailScreen} />
            <stack.Screen name='DepositCollectionScreen' component={DepositCollectionScreen} />
            <stack.Screen name='AllTransactionScreen' component={AllTransactionScreen} />
        </stack.Navigator>
    )
}
