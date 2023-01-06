import { Dimensions, Text, ScrollView, View, Pressable } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/main/Header";
import IconButton from "../../components/buttons/IconButton";
import PrimaryInput from "../../components/inputs/PrimaryInput";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Entypo } from "@expo/vector-icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../constants";

const { width, height } = Dimensions.get("window");

const DepositCollectionScreen = ({ navigation }) => {
  
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
          <Pressable style={({pressed})=>pressed? {opacity:0.5}:null}>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </Pressable>
        </Header>
      ),
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="wallet-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);

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
    console.log("Deposit made succesfully");
    navigation.navigate("Main", depositMade);
  };

  return (
    <>
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
          <Text style={{ color: "#7D1312", fontSize: 18, marginBottom: "20%" }}>
            Current Date Goes Here
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>Amount Collected Today : </Text>
          <Text>Fetched Here </Text>
        </View>

        <ScrollView
          style={styles.screen}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View style={styles.container}>
            <PrimaryInput iconName={'document-text-sharp'} iconSize={16} placeholder={"POS Transaction Id"} />
            <PrimaryInput iconName={'location'} iconSize={16} placeholder={"POS Location"} />

            <PrimaryButton
              externalStyle={{ backgroundColor: "#7D1312" }}
              onPress={handleCollections}
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
    fontSize: 14,
  },
  heading: {
    color: "#01065B",
    fontSize: 18,
    fontWeight: "700",
  },
  left: {
    width: "22@msr",
    height: "22@msr",
  },
});

export default DepositCollectionScreen;
