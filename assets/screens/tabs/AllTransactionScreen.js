import React, { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Header from "../../components/main/Header";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import LabelCard from "../../components/cards/LabelCard";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import TransactionObjectCard from "../../components/cards/TransactionObjectCard";

const AllTransactionScreen = ({ navigation }) => {
  const checkButton = () => {
    navigation.navigate("Main");
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          <PrimaryInput />
        </Header>
      ),
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="wallet-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);
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
  bgStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",

    // backgroundColor:'green'
  },
  section: {
    width: "100%",
    // backgroundColor:'yellow',
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  p: {
    color: "#fff",
    fontSize: "14@msr",
  },
});

export default AllTransactionScreen;
