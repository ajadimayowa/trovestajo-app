import React, { useLayoutEffect } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import CircleCard from "../../components/cards/CircleCard";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import Header from "../../components/main/Header";
import IconButton from "../../components/buttons/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Card from "../../components/cards/Card";
import MessageCard from "../../components/cards/MessageCard";
import CardButton from "../../components/buttons/CardButton";

const Dashboard = ({ navigation }) => {

  const handleNewClientReg =()=>{
    navigation.navigate('RegNewClient')
  }
  const checkButton = () => {
    navigation.navigate("Main");
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header></Header>,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);
  return (
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
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
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
                  padding: 10,
                },
              ]}
            >
              <CircleCard>85</CircleCard>
              <Text
                style={{
                  width: "70%",
                  textAlign: "center",
                  color: "#7D1312",
                  fontWeight: "600",
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
                  color: "#7D1312",
                  fontWeight: "600",
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
                  color: "#7D1312",
                  fontWeight: "600",
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
          <Text style={{ fontSize: 19, fontWeight: "600", color: "#01065B" }}>
            Oluwole E
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#01065B" }}>
            Tr/Ag/001
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
            <Text style={{fontSize:19, fontWeight:'800'}}>Agent Tolani</Text>
            <Text style={{fontSize:9}}>What would you like to do today?</Text>
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
          <CardButton onPress={handleNewClientReg} externalInnerStyle={{ padding: 10 }}>
            Register New Client
          </CardButton>
          <CardButton externalInnerStyle={{ backgroundColor:'#7D1312'}}>Deposit Collected Funds.</CardButton>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "orange",
  },
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom:'10%'
  },
  topSection: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 220,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  SectionViewRows: {
    flex: 1,
    margin: 5,
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
    fontSize: 14,
  },
});

export default Dashboard;
