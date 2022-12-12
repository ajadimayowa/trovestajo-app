import { View, Text, TextInput, Alert } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import Header from "../../components/main/Header";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useSelector } from "react-redux";
import DisplayMessage from '../../shared/ShowMessage'
import Loader from '../../shared/Loader'
import { depositCollectedFunds } from "../../../redux/requests/requests";
import { ACCESS_DENIED, UNAUHTORIZED } from "../../../constants";

const DepositThriftScreen = (props) => {
  const { navigation, route } = props
  const { agentData, token } = useSelector(state => state.agent)
  const { collection } = route.params
  const [reference, setreference] = useState('')
  const [loading, setloading] = useState(false)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header><Text style={styles.h}>Deposit Savings</Text></Header>,
    });
  }, [navigation]);


  // useEffect(() => {
  //   setagentCollection(collection)
  // }, [navigation])
  const depositFunds = async () => {
    try {
      if (reference === '') {
        return DisplayMessage('Payment reference is empty', 'warning', 'Empty field', 'center')
      }
      else {
        setloading(true)
        const requestData = {
          collection_id: collection._id,
          payment_reference: reference,
          token: token
        }
        const response = await depositCollectedFunds(requestData)
        const { success, data, message } = response.data
        if (success === true) {
          setloading(false)
          DisplayMessage(message, 'success', 'Funds deposited awaiting confirmation')
          setTimeout(() => {
            navigation.goBack()
          }, 1200);
        }
        else if (success === false && (message === UNAUHTORIZED || message === ACCESS_DENIED)) {
          setloading(false)
          DisplayMessage(message, 'warning', 'Unauthorized')
          navigation.navigate('Login')
        }
        else {
          setloading(false)
          DisplayMessage(message, 'warning', 'Something went wrong')
        }
      }
    } catch (error) {
      setloading(false)
      DisplayMessage(error.message, 'danger', 'Error Occured')
    }
  }
  return (
    <>
      {loading && <Loader/>}
       <View style={styles.screen}>
      <Text style={{ color: '#7D1312', fontSize: 18 }}>Current Date goes here</Text>
      <View style={styles.form}>
        <PrimaryInput
          placeholder={'Amount Deposited'}
          defaultValue={collection.total.toString()}
          editable={false}
        />
        <PrimaryInput placeholder={'POS Payment Reference'}
          value={reference}
          onChangeText={(text) => {
            setreference(text)
          }}
        />
        {/* <PrimaryInput placeholder={'POS Location'} /> */}
        <PrimaryButton externalStyle={{ backgroundColor: '#7D1312' }} externalOuterStyle={{ width: '100%' }} onPress={() => depositFunds()}>Submit</PrimaryButton>
      </View>
    </View>
    </>
  );
};

export default DepositThriftScreen;

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: '5%',
    paddingVertical: '10%'
  },
  p: {

  },
  h: {
    color: '#01065B',
    fontFamily: 'bold',
    fontSize: '18@msr',

  },
  form: {
    marginTop: '10%',
    // backgroundColor:'green',
    height: '440@msr',
    width: '100%'
  },
});
