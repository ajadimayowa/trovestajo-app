import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './assets/screens/LoginScreen';
import TabScreens from './assets/screens/tabs/TabScreens';
import { useFonts } from 'expo-font';
import FlashMessage from "react-native-flash-message";

const stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="Login" component={LoginScreen} />
          <stack.Screen name="Main" component={TabScreens} />
        </stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
