import React, { useLayoutEffect } from "react";
import { Alert, Image, ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";

const Dashboard = ({ navigation }) => {

  const checkButton = ()=>{
    navigation.navigate('Main')
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);
  return (
        <SafeAreaView style={styles.screen}>
          {/* logo section */}
          <View style={styles.container}>

            {/* form section */}
            <View style={[styles.section, { marginTop: "30%" }]}>
              
            </View>
            {/* support section */}
            <View style={[styles.section, { marginTop: "30%",height:'7%', justifyContent:'space-between' }]}>
             <Text style={[styles.p,{color:'#01065B'}]}>Forgot Password ?</Text>
             <Text style={[styles.p,{color:'#7A0D0C'}]}>Contact Support</Text>
            </View>
          </View>
        </SafeAreaView>
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

export default Dashboard;
