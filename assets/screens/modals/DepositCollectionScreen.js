import { Dimensions, Text, ScrollView, View, Pressable } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/main/Header";
import IconButton from "../../components/buttons/IconButton";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Entypo } from "@expo/vector-icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { ACCESS_DENIED, COLORS, convertToThousand, returnYearMonthDate, timeFunction, UNAUHTORIZED } from "../../../constants";
import { getTodayThrift } from "../../../redux/requests/requests";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader";
import DisplayMessage from "../../shared/ShowMessage";
import { depositCollectedFunds } from "../../../redux/requests/requests";

const { width, height } = Dimensions.get("window");
const DepositCollectionScreen = ({ navigation }) => {

  const { token } = useSelector((state) => state.agent);
  const [thriftData, setthriftData] = useState({})
  const [paymentData, setpaymentData] = useState({
    reference: '',
    location: ''
  })
  const [loading, setloading] = useState(false)
  const [message, setmessage] = useState('')


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          <IconButton
            onPress={handleGoBack}
            externalInnerStyle={{
              backgroundColor: "#fff",
              backgroundColor: null,
              elevation: null,
            }}
            iconName={"chevron-back-outline"}
            iconSize={20}
            iconColor={"black"}
          />
          <Text
            style={{
              fontSize: moderateScale(12),
              fontFamily: "bold",
              color: COLORS.troBlue,
            }}
          >
            Deposit Collections
          </Text>
          <Pressable style={({ pressed }) => pressed ? { opacity: 0.5 } : null}>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </Pressable>
        </Header>
      ),
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="wallet-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);


  useEffect(() => {
    getThrift()
  }, [navigation])
  const handleGoBack = () => {
    navigation.goBack();
  };

  let posPaymentId = "";
  let posLocation = "";

  const depositMade = {
    depositId: posPaymentId,
    depositLocation: posLocation,
  };

  const handleCollections = () => {
    navigation.navigate("Main", depositMade);
  };

  const getThrift = async () => {
    try {
      const date_paid = await returnYearMonthDate(new Date());
      const thrift = {
        token,
        date_paid: date_paid
      }
      setloading(true)
      const response = await getTodayThrift(thrift)
      if (response && response.data) {
        const { success, message, data } = response.data
        if (success === true) {
          if (data.status === 1) {
            setthriftData({})
            setmessage('')
            setloading(false)
          }
          else {
            setthriftData(data)
            setmessage('')
            setloading(false)
          }
        }
        else {
          setloading(false)
          setthriftData({})
          if (message === 'Data not found') {
            return setmessage('No thrift collected today')
          }
          return DisplayMessage(message, 'warning', 'Oops!')
        }
      }
      else {
        setloading(false)
        DisplayMessage('Something went wrong', 'warning', 'Oops!')
      }
    } catch (error) {
      setloading(false)
      DisplayMessage(error.message, 'danger', 'Error Occured')
    }
  };

  const depositFunds = async () => {
    try {
      const { reference, location } = paymentData
      if (reference === '' && location === '') {
        return DisplayMessage('Some fields are empty', 'warning', 'Empty field', 'center')
      }
      else {
        setloading(true)
        const requestData = {
          collection_id: thriftData._id,
          payment_reference: reference,
          location: location,
          token: token
        }
        const response = await depositCollectedFunds(requestData)
        const { success, data, message } = response.data
        if (success === true) {
          setloading(false)
          DisplayMessage(message, 'success', 'Funds deposited awaiting confirmation')
          setTimeout(() => {
            // navigation.goBack()
            // navigation.navigate("Main", paymentData);
            navigation.navigate("TransactionScreen", paymentData);
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
      {loading && <Loader />}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flex: 1,
          paddingVertical: "10%",
        }}
      >
        <View>
          <Text style={{ color: "#7D1312", fontSize: moderateScale(16), fontFamily: 'medium' }}>
            {`${new Date().toDateString()}`} | {timeFunction(new Date())}
          </Text>
        </View>
        <View>
          <Text style={{ color: "#7D1312", fontSize: moderateScale(16), marginBottom: "5%", marginTop: moderateScale(20), fontFamily: 'medium' }}>
            {message}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.amount}>Amount Collected Today : </Text>
          <Text>{convertToThousand(thriftData?.total || 0)} </Text>
        </View>

        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View style={styles.container}>
            <PrimaryInput iconName={'document-text-sharp'} iconSize={16} placeholder={"POS Transaction Reference"} onChangeText={(text) => setpaymentData({...paymentData, reference: text})} />
            <PrimaryInput iconName={'location'} iconSize={16} placeholder={"POS Location"}  onChangeText={(text) => setpaymentData({...paymentData, location: text})}/>

            <PrimaryButton
              externalStyle={{ backgroundColor: "#7D1312" }}
              onPress={depositFunds}
            >
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
    alignItems: "center",
  },
  container: {
    marginTop: "20@msr",
    alignItems: "center",
    width: "97%",
  },
  p: {
    color: "#01065B",
    fontSize: '14@msr',
  },
  heading: {
    color: "#01065B",
    fontSize: '18@msr',
    fontWeight: "700",
  },
  left: {
    width: "22@msr",
    height: "22@msr",
  },
  amount: {
    fontFamily: 'medium',
    fontSize: '14@msr'
  }
});

export default DepositCollectionScreen;
