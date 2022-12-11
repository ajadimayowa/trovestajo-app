import { Dimensions, Text, ScrollView, View } from "react-native";
import { useEffect, useState, useLayoutEffect} from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/main/Header";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import { ScaledSheet } from "react-native-size-matters";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useSelector } from "react-redux";


const { width, height } = Dimensions.get("window");

const DepositFundScreen = ({navigation}) => {
  const { agentData, token } = useSelector(state => state.agent)
  console.log('agentData',token)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          <Text style={styles.heading}>Deposit Savings</Text>
        </Header>
      ),
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="wallet-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);
  return (
    <>
    <View style={{alignItems:'center', justifyContent:'center', width:'100%', flex:1, paddingVertical:'30%'}}>
      <Text style={{color:'#7D1312', fontSize:18}}>Current Date Goes Here</Text>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.container}>
          <PrimaryInput
            placeholder={"Amount Paid"}
          />

          <PrimaryInput
            placeholder={"POS Transaction Id"}
          />
          <PrimaryInput
            placeholder={"POS Location"}
          />

          <PrimaryButton externalStyle={{backgroundColor:'#7D1312'}} onPress={() => registerArtisan()}>
          Submit
          </PrimaryButton>
        </View>
      </ScrollView>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: width,
  },
  contentContainerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems:'center'
  },
  container: {
    marginTop: "20@msr",
    alignItems: "center",
    width: "97%",
  },
  p:{
    color:'#01065B',
    fontSize:14,
  },
  heading :{
    color:'#01065B',
    fontSize:18,
    fontWeight:'700'
  },
  left: {
    width: "22@msr",
    height: "22@msr",
  },
});

export default DepositFundScreen;
