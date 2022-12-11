import React, { useLayoutEffect, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Header from "../../components/main/Header";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import LabelCard from "../../components/cards/LabelCard";
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
    <>
      {loading && <Loader />}
      <ScrollView style={styles.screen}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.container}>
          <LabelCard title={'Transaction History'} />
          <View style={styles.section}>
            <SharedList
              data={collections}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                item.status === 1 && <View key={item._id} style={styles.thrifts}>
                  <View>
                    <Text style={styles.thrifttext1}>{item.payment_reference}</Text>
                    <Text style={styles.thrifttext}>{`${new Date(item.datePaid).toDateString()} | ${new Date(item.datePaid).toLocaleTimeString()}`}</Text>
                  </View>
                  <Text style={styles.thrifttext}>{`${convertToThousand(item?.total)}`}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: width
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#e3e3e3'
  },
  container: {
    alignItems: "center",
  },
  section: {
    marginTop: '15@msr',
    width: width * .97,
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
