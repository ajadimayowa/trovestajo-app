import React, { useLayoutEffect, useState, useEffect } from "react";
import { Alert, Image, ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet } from "react-native";
import bgImage from "../components/assets/images/login-screen-bg.png";
import loginScreenLogo from "../components/assets/images/login-screen-logo.png";
import PrimaryInput from "../components/inputs/PrimaryInput";
import PrimaryButton from "../components/buttons/PrimaryButton";
import DisplayMessage from "../shared/ShowMessage";
import { getAgentSuccess } from "../../redux/slices/agent.slice";
import { useDispatch, useSelector, connect } from "react-redux";
import { loginAgent } from "../../redux/requests/requests";
import { agentKey, COLORS } from "../../constants";
import Loader from "../shared/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScaledSheet } from "react-native-size-matters";

const LoginScreen = (props) => {
  const dispatch = useDispatch()
  const { navigation } = props
  const { agent } = useSelector(state => state.agent)
  const [loading, setloading] = useState(false)
  const [agentData, setagentData] = useState({ assigned_id: '', password: '' })


  const checkInput = () => {
    let valid = true
    if (agentData.assigned_id === '' || agentData.password === '') {
      valid = false
    }
    return valid
  }

  const agentLogin = async () => {
    try {
      const valid = checkInput()
      if (valid === false) {
        DisplayMessage('Some fields are empty', 'warning', 'Empty fields')
      } else {
        setloading(true)
        const response = await loginAgent(agentData)
        const { data, success, message, token } = response.data
        if (success === false) {
          DisplayMessage(message, 'warning', 'Warning')
          setloading(false)
        }
        else {
          const info = {
            data,
            success: success,
            token: token
          }
          await AsyncStorage.setItem(`${agentKey}`, token)
          dispatch(getAgentSuccess(info))
          DisplayMessage(message, 'success', 'Success')
          navigation.navigate('Main')
          setloading(false)
        }
      }
    } catch (error) {
      DisplayMessage(error.message, 'danger', 'Error Occured')
      setloading(false)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <LinearGradient colors={["#ffff", "#EAC0AA"]} style={styles.screen}>
      {loading && <Loader />}
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
              <PrimaryInput placeholder={"Enter ID"}
                value={agentData.assigned_id}
                onChangeText={(text) => {
                  setagentData({ ...agentData, assigned_id: text })
                }}
              />
              <PrimaryInput placeholder={"Enter Your Password"}
                secureTextEntry={true}
                value={agentData.password}
                onChangeText={(text) => {
                  setagentData({ ...agentData, password: text })
                }}
              />
              <PrimaryButton onPress={agentLogin}>Login</PrimaryButton>
            </View>
            {/* support section */}
            <View style={[styles.section, { marginTop: "30%", height: '7%', justifyContent: 'space-between' }]}>
              <Text style={[styles.p, { color: COLORS.troBlue }]}>Forgot Password ?</Text>
              <Text style={[styles.p, { color: COLORS.troGold }]}>Contact Support</Text>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = ScaledSheet.create({
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
  p: {
    color: '#fff',
    fontSize: '18@msr',
    fontFamily: 'regular'
  }
});

export default LoginScreen;
