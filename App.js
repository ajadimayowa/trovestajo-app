import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useFonts } from 'expo-font';
import Navigation from './navigations/index'
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import store from './redux/store';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { fontsLoaded } from './constants';
import Loader from './assets/shared/Loader';


const persistor = persistStore(store)
export default function App() {
  const [fonts] = useFonts(fontsLoaded)

  if (!fonts) {
    return <Loader/>
  }
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <Navigation />
        <FlashMessage position="top" />
      {/* </PersistGate> */}
    </Provider>
  );
}

