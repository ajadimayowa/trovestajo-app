import React, { useLayoutEffect } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CircleCard from "../../components/cards/CircleCard";
import Card from "../../components/cards/Card";
import MessageCard from "../../components/cards/MessageCard";
import CardButton from "../../components/buttons/CardButton";

const Dashboard = ({ navigation }) => {
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight :()=>{ return <PrimaryButton onPress={checkButton }>Logout</PrimaryButton>}
    });
  }, [navigation]);

  const checkButton = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.screen}>
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          {/* form section */}
          <View style={[styles.section, styles.topSection]}>
            <View style={styles.topSectionViewsRowOne}>
              <Text>Here is Your Performance So far</Text>
            </View>

            <View style={styles.topSectionViewsRowTwo}>
              <View style={[styles.topSectionViewsRowTwoViews]}>
                <CircleCard>80</CircleCard>
                <Text style={styles.topSectionViews_p}>Clients Registered</Text>
              </View>

              <View style={[styles.topSectionViewsRowTwoViews]}>
                <CircleCard>70%</CircleCard>
                <Text style={styles.topSectionViews_p}>
                  Timely Cash Pick-up
                </Text>
              </View>

              <View style={[styles.topSectionViewsRowTwoViews]}>
                <CircleCard>85%</CircleCard>
                <Text style={styles.topSectionViews_p}>
                  Timely Cash Deposit
                </Text>
              </View>
            </View>
          </View>

          {/* section two*/}
          <View style={[styles.section, styles.section_two]}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{fontSize:19, fontWeight:'700'}}>Agent Record</Text>
              <Text>#Tr/Ag/0023</Text>
            </View>
            <Card />
            <MessageCard />
            <View
              style={[styles.section,{marginTop:'5%'}]}
            >
              <Text style={{ fontSize: 20 }}>Agent Tola</Text>
              <Text style={{ fontSize: 9 }}>
                What would you like to do today?
              </Text>
              <View style={[styles.section,{flexDirection:'row', width:'100%', justifyContent:'center',marginTop: "3%",}]}>
                <CardButton externalInnerStyle={{backgroundColor:'#01065B'}}>Register New Client</CardButton>
                <CardButton externalInnerStyle={{backgroundColor:'#7D1312'}}>Deposit Collected Funds.</CardButton>
              </View>
            </View>
          </View>
          {/* section 3 */}
        </View>
      </SafeAreaView>
    </ScrollView>
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
    width: "100%",
    alignItems: "center",
    // backgroundColor:'green'
  },
  section: {
    width: "100%",
    // backgroundColor:'yellow',
    alignItems: "center",
  },
  topSection: {
    backgroundColor: "#fff",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    height: "35%",
    justifyContent: "space-around",
    shadowOffset: [0, 4],
    shadowColor: "#000000",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  topSectionViewsRowOne: {
    // backgroundColor:'red',
    width: "100%",
    justifyContent: "space-around",
    height: "15%",
    alignItems: "center",
  },
  topSectionViewsRowTwo: {
    // backgroundColor:'red',
    height: "90%",
    width: "100%",

    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  p: {
    color: "#fff",
    fontSize: 14,
  },
  topSectionViewsRowTwoViews: {
    justifyContent: "space-around",
    height: "80%",
    alignItems: "center",
    // backgroundColor:'blue'
  },

  topSectionViews_p: {
    flexWrap: "wrap",
    width: 90,
    textAlign: "center",
    color: "#7D1312",
  },
  section_two: {
    marginTop: "10%",
    paddingHorizontal: "5%",
    height: "7%",
    justifyContent: "space-between",
  },
});

export default Dashboard;
