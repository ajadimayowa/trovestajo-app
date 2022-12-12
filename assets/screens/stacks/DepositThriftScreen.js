import { View, Text } from "react-native";
import { useLayoutEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import Header from "../../components/main/Header";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const DepositThriftScreen = ({navigation}) => {
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          header: () => <Header><Text style={styles.h}>Deposit Savings</Text></Header>,
        });
      }, [navigation]);

  return (
    <View style={styles.screen}>
      <Text style={{color:'#7D1312', fontSize:18}}>Current Date goes here</Text>
      <View style={styles.form}>
       <PrimaryInput placeholder ={'Amount Deposited'}/>
       <PrimaryInput placeholder ={'POS Transaction Id'}/>
       <PrimaryInput placeholder ={'POS Location'}/>
       <PrimaryButton externalStyle={{backgroundColor:'#7D1312'}} externalOuterStyle={{width:'100%'}}>Submit</PrimaryButton>
      </View>
    </View>
  );
};

export default DepositThriftScreen;

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal:'5%',
    paddingVertical:'10%'
  },
  p:{

  },
  h:{
    color:'#01065B',
    fontFamily: 'bold',
    fontSize:'18@msr',

  },
  form: {
    marginTop:'10%',
    // backgroundColor:'green',
    height:'440@msr',
    width:'100%'
  },
});
