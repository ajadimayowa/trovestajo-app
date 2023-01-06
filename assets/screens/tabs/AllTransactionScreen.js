import React, { useLayoutEffect, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Header from "../../components/main/Header";
import PrimaryInput from "../../components/inputs/PrimaryInput";
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
  const { navigation, route } = props

  let deposit = props.route.params;

  console.log(deposit)

  const { agentData, token } = useSelector(state => state.agent)
  const [loading, setloading] = useState(false)
  const [collections, setcollections] = useState([])
  const [section, setsection] = useState('collections')


  const checkButton = () => {
    navigation.navigate("Main");
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          <PrimaryInput iconSize={20} iconName={'search-outline'} placeholder={"Enter ID To Search…."} />
        </Header>
      ),
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="wallet-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getAllCollectionHistory()
    const unsubscribe = navigation.addListener('focus', () => {
      getAllCollectionHistory()
    });
    return unsubscribe
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
      DisplayMessage(error.message, 'danger', 'Error Occured')
    }
  }
  return (
    <>
      {loading && <Loader />}
      <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainerStyle}>
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
                externalStyle={{ backgroundColor: section === 'collections' ? "#3E3B3B" : '#6C6868', borderRadius: null }}
                onPress={() => setsection('collections')}
              >
                Collections
              </PrimaryButton>
              <PrimaryButton
                externalOuterStyle={{ width: moderateScale(102) }}
                externalStyle={{ backgroundColor: section === 'deposits' ? "#3E3B3B" : '#6C6868', borderRadius: null }}
                onPress={() => setsection('deposits')}
              >
                Deposits
              </PrimaryButton>
              <PrimaryButton
                externalOuterStyle={{ width: 102 }}
                externalStyle={{ backgroundColor: section === 'payouts' ? "#3E3B3B" : '#6C6868', borderRadius: null }}
                onPress={() => setsection('payouts')}
              >
                Payouts
              </PrimaryButton>
            </View>
          </View>
        </View>
        <ScrollView style={{ marginTop: moderateScale(30) }}>
          {section === 'collections' && <SharedList
            data={collections}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <TransactionObjectCard item={item} key={item._id} status={0} navigation={navigation} />}
          />}
          {section === 'deposits' && <SharedList
            data={collections}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <TransactionObjectCard item={item} key={item._id} status={1} navigation={navigation} />}
          />}
          {section === 'payouts' && <SharedList
            data={collections}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <TransactionObjectCard item={item} key={item._id} navigation={navigation} />}
          />}
        </ScrollView>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
    marginTop: '10@msr',
    backgroundColor: COLORS.backgroundGray
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
    color: COLORS.troGold
  }
});

export default AllTransactionScreen;
