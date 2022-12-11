import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";
import CircleCard from "../../components/cards/CircleCard";
import { SafeAreaView } from "react-native";
import Header from "../../components/main/Header";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Card from "../../components/cards/Card";
import MessageCard from "../../components/cards/MessageCard";
import CardButton from "../../components/buttons/CardButton";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../shared/Loader";
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { getArtisanData, pageLoading, getAgentArtisanSuccess } from "../../../redux/slices/artisan.slice";
import { getAgentArtisan } from "../../../redux/requests/requests";
import DisplayMessage from "../../shared/ShowMessage";
import { ACCESS_DENIED, COLORS, UNAUHTORIZED } from "../../../constants";


const Dashboard = (props) => {
  const { navigation } = props
  const dispatch = useDispatch()
  const { agentData, token } = useSelector(state => state.agent)
  const { isLoading, artisans, success } = useSelector(state => state.artisan)
  const [agent, setagent] = useState()
  const [loading, setloading] = useState(false)


  const handleNewClientReg = () => {
    navigation.navigate('RegNewClient')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header></Header>,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setloading(true)
    getArtisans()
    const unsubscribe = navigation.addListener('focus', () => {
      setloading(true)
      dispatch(pageLoading(true))
      getArtisans()
    });
    return unsubscribe;
  }, [token, navigation])

  const getArtisans = async () => {
    try {
      if (token) {
        setagent(agentData)
        // make a normal request and use this to set the artiasna instead of redux saga
        const response = await getAgentArtisan(token)
        const { success, message, data } = response.data
        if (success === true) {
          const payload = {
            data,
            message: message,
            success: success,
            isLoading: false
          }
          dispatch(getAgentArtisanSuccess(payload))
          setloading(false)
        }
        else if (message === UNAUHTORIZED || message === ACCESS_DENIED) {
          DisplayMessage(message, 'warning', 'Something went wrong')
          setloading(false)
          setTimeout(() => {
            navigation.navigate("Login");
          }, 2000);
        }
        else {
          DisplayMessage(message, 'warning', 'Something went wrong')
          setloading(false)
        }
      }
      else {
        setloading(false)
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      }
    } catch (error) {
      DisplayMessage(error.message, 'danger', 'Error Occured')
      setloading(false)
    }
  }

  return (
    <>
      {loading && <Loader />}
      <ScrollView style={styles.screen}>
        <SafeAreaView style={styles.container}>
          {/* top section starts here */}
          <View style={[styles.section, styles.topSection]}>
            {/* first row */}
            <View
              style={[
                styles.SectionViewRows,
                { justifyContent: "space-around", marginTop: "5%" },
              ]}
            >
              <Text style={{ fontSize: moderateScale(14), fontFamily: "regular" }}>
                Here is Your Performance So far
              </Text>
              <Feather name="activity" size={24} color="black" />
            </View>
            {/* second row */}
            <View
              style={[
                styles.SectionViewRows,
                { justifyContent: "space-around", flex: 5 },
              ]}
            >
              {/* col 1 */}
              <View
                style={[
                  {
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: moderateScale(10),
                  },
                ]}
              >
                <CircleCard>{artisans?.length}</CircleCard>
                <Text
                  style={{
                    width: "70%",
                    textAlign: "center",
                    color: COLORS.troBrown,
                    fontFamily: "bold",
                    fontSize: moderateScale(14)
                  }}
                >
                  Clients Registered
                </Text>
              </View>

              {/* col 2 */}
              <View
                style={[{ alignItems: "center", justifyContent: "space-around" }]}
              >
                <CircleCard>85%</CircleCard>
                <Text
                style={{
                  width: "70%",
                  textAlign: "center",
                  color: COLORS.troBrown,
                  fontFamily: "bold",
                  fontSize: moderateScale(13)
                }}
                >
                  Timely Cash Pick-up
                </Text>
              </View>

              {/* col 3 */}
              <View
                style={[{ alignItems: "center", justifyContent: "space-around" }]}
              >
                <CircleCard>76%</CircleCard>
                <Text
                style={{
                  width: "70%",
                  textAlign: "center",
                  color: COLORS.troBrown,
                  fontFamily: "bold",
                  fontSize: moderateScale(13)
                }}
                >
                  TimelyCash Deposit
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.section,
              {
                padding: 15,
                height: 60,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: "2%",
                backgroundColor: "#fff",
              },
            ]}
          >
            <Text style={{ fontSize: moderateScale(19), fontFamily: "bold", color: COLORS.troBlue }}>
              {`${agent?.first_name} ${agent?.last_name.charAt(0)}`}
            </Text>
            <Text style={{ fontSize: moderateScale(12), fontFamily: "bold", color: COLORS.troBlue }}>
              {`${agent?.assigned_id}`}
            </Text>
          </View>

          <View
            style={[styles.section, { marginTop: 10, backgroundColor: null }]}
          >
            <Card />
          </View>

          <View
            style={[
              styles.section,
              {
                backgroundColor: null,
                justifyContent: "center",
                marginTop: "8%",
              },
            ]}
          >
            <MessageCard />
          </View>
          <View
            style={[
              styles.section,
              {
                backgroundColor: null,
                justifyContent: "center",
                marginTop: "3%",
              },
            ]}
          >
            <View style={[{ alignItems: "center" }]}>
              <Text style={{  fontSize: moderateScale(19), fontFamily: "bold", color: COLORS.troBlue  }}>Agent {`${agent?.first_name}`}</Text>
              <Text style={{  fontSize: moderateScale(10), fontFamily: "regular", color: COLORS.troBlue  }}>What would you like to do today?</Text>
            </View>
          </View>
          <View
            style={[
              styles.section,
              {
                backgroundColor: null,
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "3%",
              },
            ]}
          >
            <CardButton onPress={handleNewClientReg} externalInnerStyle={{ padding: 10 }} textStyles={{fontSize: moderateScale(10), fontFamily: "bold"}}>
              Register New Client
            </CardButton>
            <CardButton externalInnerStyle={{ backgroundColor: COLORS.troBrown }} textStyles={{fontSize: moderateScale(10), fontFamily: "bold"}}>Deposit Collected Funds.</CardButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: '10%'
  },
  topSection: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: '220@msr',
    marginBottom: '10@msr',
    paddingBottom: '10@msr',
    borderBottomLeftRadius: '40@msr',
    borderBottomRightRadius: '40@msr',
  },
  SectionViewRows: {
    flex: 1,
    margin: '5@msr',
    flexDirection: "row",
    width: "100%",
  },
  topSectionViewsRowTwo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  topSectionViewsRowTwoViews: {
    // backgroundColor:'red',
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    width: "100%",
    backgroundColor: "blue",
    justifyContent: "space-around",
    alignItems: "center",
  },
  p: {
    color: "#fff",
    fontSize: '14@msr',
  },
});

export default Dashboard;
