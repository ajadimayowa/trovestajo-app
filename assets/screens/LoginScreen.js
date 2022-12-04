import React, { useLayoutEffect } from "react";
import { Alert, Image, ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import bgImage from "../components/assets/images/login-screen-bg.png";
import loginScreenLogo from "../components/assets/images/login-screen-logo.png";
import PrimaryInput from "../components/inputs/PrimaryInput";
import PrimaryButton from "../components/buttons/PrimaryButton";

const LoginScreen = ({ navigation }) => {

  const checkButton = ()=>{
    navigation.navigate('Main')
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  function catchInputData(userInputData){
    return(
      console.log(userInputData)
    )
  }
  return (
    <LinearGradient colors={["#ffff", "#EAC0AA"]} style={styles.screen}>
      <ImageBackground
        source={bgImage}
        resizeMode="stretch"
        style={styles.bgStyle}
      >
        <SafeAreaView style={styles.screen}>
          {/* logo section */}
          <View style={styles.container}>
            <View style={[styles.section, { marginTop: "50%" }]}>
              <Image
                source={loginScreenLogo}
                style={{ width: 212, height: 77 }}
              />
            </View>
            {/* form section */}
            <View style={[styles.section, { marginTop: "30%" }]}>
              <PrimaryInput catchInputData={catchInputData} secureTextEntry={true} placeholder={"Enter ID"} />
              <PrimaryInput catchInputData={catchInputData} secureTextEntry={true} placeholder={"Enter Your Password"} />
              <PrimaryButton onPress={checkButton}>Login</PrimaryButton>
            </View>
            {/* support section */}
            <View style={[styles.section, { marginTop: "30%",height:'7%', justifyContent:'space-between' }]}>
             <Text style={[styles.p,{color:'#01065B'}]}>Forgot Password ?</Text>
             <Text style={[styles.p,{color:'#7A0D0C'}]}>Contact Support</Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bgStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "10%",
    // backgroundColor:'green'
  },
  section: {
    width: "100%",
    // backgroundColor:'yellow',
    alignItems: "center",
  },
  p:{
    color:'#fff',
    fontSize:14,
}
});

export default LoginScreen;
