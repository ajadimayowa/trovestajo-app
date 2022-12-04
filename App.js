import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import Navigation from './navigations/index'
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import store from './redux/store';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)
export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <Navigation />
        <FlashMessage position="top" />
      {/* </PersistGate> */}
    </Provider>
  );
}

