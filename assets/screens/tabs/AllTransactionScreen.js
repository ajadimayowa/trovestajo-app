import React, { useLayoutEffect, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Header from "../../components/main/Header";
import LabelCard from "../../components/cards/LabelCard";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import TransactionObjectCard from "../../components/cards/TransactionObjectCard";
import { useSelector } from "react-redux";
import DisplayMessage from "../../shared/ShowMessage";
import SharedList from "../../shared/SharedList";
import { getAgentCollection } from "../../../redux/requests/requests";
import { ACCESS_DENIED, COLORS, convertToThousand, UNAUHTORIZED } from "../../../constants";
import Loader from "../../shared/Loader";



const { width, height } = Dimensions.get('window')
const AllTransactionScreen = (props) => {
  const { navigation } = props
  const { agentData, token } = useSelector(state => state.agent)
  const [loading, setloading] = useState(false)
  const [collections, setcollections] = useState([])
  console.log('agentData', agentData._id)
  const checkButton = () => {
    navigation.navigate("Main");
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          {/* <PrimaryInput /> */}
        </Header>
      ),
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="wallet-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getAllCollectionHistory()
    // return () => {
    //   getAllCollectionHistory()
    // }
  }, [navigation])


  const getAllCollectionHistory = async () => {
    try {
      if (agentData._id) {
        const requestData = {
          agent_id: agentData._id,
          token
        }
        setloading(true)
        const response = await getAgentCollection(requestData)
        const { success, message, data } = response.data
        if (success === true) {
          setcollections(data)
          setloading(false)
          console.log('data', data.length)
        }
        else if (success === false && (message === ACCESS_DENIED || message === UNAUHTORIZED)) {
          setloading(false)
          DisplayMessage(message, 'warning', 'Unauthorized')
          navigation.navigate('Login')
        }
        else {
          setloading(false)
          DisplayMessage(message, 'warning', 'Something went wrong')
        }
      }
      else {
        DisplayMessage('Unauthorized Access', 'warning', 'Unauthorized')
      }
    } catch (error) {
      setloading(false)
      console.log('response error', error)
      DisplayMessage(error.message, 'danger', 'Error Occured')
    }
  }
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <LabelCard title={"Transaction History"} />

        <View style={styles.section}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <PrimaryButton
              externalOuterStyle={{ width: 102, borderRadius: null }}
              externalStyle={{ backgroundColor: "#3E3B3B", borderRadius: null }}
            >
              Collections
            </PrimaryButton>
            <PrimaryButton
              externalOuterStyle={{ width: 102 }}
              externalStyle={{ backgroundColor: "#6C6868", borderRadius: null }}
            >
              Deposits
            </PrimaryButton>
            <PrimaryButton
              externalOuterStyle={{ width: 102 }}
              externalStyle={{ backgroundColor: "#6C6868", borderRadius: null }}
            >
              Payouts
            </PrimaryButton>
          </View> 
        </View>
        <ScrollView style={{marginTop:10}} contentContainerStyle={{paddingHorizontal:'2%'}}>
            <TransactionObjectCard />
            <TransactionObjectCard />
            <TransactionObjectCard />
            <TransactionObjectCard />
            <TransactionObjectCard />
            <TransactionObjectCard />
          </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    backgroundColor:'#fff'
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#e3e3e3'
  },
  container: {
    alignItems: "center",

    // backgroundColor:'green'
  },
  section: {
    width: "100%",
    // backgroundColor:'yellow',
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  thrifts: {
    backgroundColor: COLORS.cardColor,
    width: '100%',
    paddingTop: '10@msr',
    paddingBottom: '10@msr',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '7@msr',
    paddingRight: '7@msr'
  },
  thrifttext: {
    fontSize: '17@msr',
    color: COLORS.troBlue
  },
  thrifttext1: {
    fontSize: '18@msr',
    fontWeight: '800',
    color: COLORS.troBrown
  }
});

export default AllTransactionScreen;
