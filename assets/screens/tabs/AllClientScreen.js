import React, { useLayoutEffect } from "react";
import {
  Alert,
  FlatList,
  View,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/main/Header";
import IconButton from "../../components/buttons/IconButton";
import { Ionicons } from "@expo/vector-icons";
import ClientObjectCard from "../../components/cards/ClientObjectCard";
import LabelCard from "../../components/cards/LabelCard";
import {AllCustormer} from "../../store/data";

const AllClientScreen = ({ navigation }) => {
  const checkButton = () => {
    navigation.navigate("Main");
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header></Header>,
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="people-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.screen}>
      <LabelCard
        title={"Your Registered Artisans"}
        totalClientRegistered={"68"}
      />
      <View style={styles.container}>
        <FlatList data={AllCustormer} keyExtractor={(data)=>{data.c_id}} renderItem={(data)=>
        <ClientObjectCard totalSaved={data.item.c_fname} 
        nameOfClient={data.item.c_fname} />} />
        <ClientObjectCard nameOfClient={'Ojo'} totalSaved={'$60'}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    paddingVertical: "10%",
  },
  container: {
    width: "100%",
    alignItems: "center",
    // backgroundColor:'green'
  },
  section: {
    width: "100%",
    // backgroundColor:'yellow',
    alignItems: "center",
  },
  p: {
    color: "#fff",
    fontSize: 14,
  },
});

export default AllClientScreen;
