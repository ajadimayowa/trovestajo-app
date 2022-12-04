import React, { useLayoutEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { ScaledSheet } from 'react-native-size-matters';


const AllTransactionScreen = ({ navigation }) => {

  const checkButton = () => {
    navigation.navigate('Main')
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size}
        color={color} />,
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
        <View style={[styles.section, { marginTop: "30%", height: '7%', justifyContent: 'space-between' }]}>
          <Text style={[styles.p, { color: '#01065B' }]}>Forgot Password ?</Text>
          <Text style={[styles.p, { color: '#7A0D0C' }]}>Contact Support</Text>
        </View>
      </View>
    </SafeAreaView>
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
    fontSize: '14@msr',
  }
});

export default AllTransactionScreen;
