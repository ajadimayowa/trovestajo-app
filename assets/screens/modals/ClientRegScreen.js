import { View, StyleSheet, Text} from "react-native"
import { useLayoutEffect } from "react";
import {Ionicons} from '@expo/vector-icons';
import Header from "../../components/main/Header";
import RegistrationForm from "../../components/forms/RegistrationForm";

const ClientRegScreen = ({navigation})=>{
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          header: () => <Header></Header>,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        });
      }, [navigation]);

      const handleGoToPrevScreen =()=>{
        navigation.goBack()
      }
    return (
        <View style={styles.screen}>
            <RegistrationForm handleGoBack={handleGoToPrevScreen}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      width: "100%",
      
    },
})

export default ClientRegScreen;