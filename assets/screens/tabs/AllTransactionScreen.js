import React, { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Header from "../../components/main/Header";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import LabelCard from "../../components/cards/LabelCard";

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
       
        <View style={[styles.section, { marginTop: "10%" }]}>
          <LabelCard title={'Transaction History'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
  },
  bgStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "10%",
    // backgroundColor:'green'
  },
  section: {
    width: "100%",
    // backgroundColor:'yellow',
    alignItems: "center",
  },
  p: {
    color: "#fff",
    fontSize: "14@msr",
  },
});

export default AllTransactionScreen;
