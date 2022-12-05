import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  Pressable,
  View,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Header from "../../components/main/Header";
import { Ionicons } from "@expo/vector-icons";
import ClientObjectCard from "../../components/cards/ClientObjectCard";
import LabelCard from "../../components/cards/LabelCard";
import { AllCustormer } from "../../store/data";
import { useSelector } from "react-redux";
import SharedList from "../../shared/SharedList";
import { ScaledSheet } from 'react-native-size-matters';
import { calculateRevenueAmount, convertToThousand } from "../../../constants";
import Loader from "../../shared/Loader";



const { width } = Dimensions.get('window')
const AllClientScreen = ({ navigation }) => {
  const selector = useSelector(state => state)
  const [agentArtisans, setagentArtisans] = useState([])
  const { token } = selector.agent
  const { artisans } = selector.artisan
  const [loading, setloading] = useState(false)

  const checkButton = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    setloading(true)
    getUser()
    const unsubscribe = navigation.addListener('focus', () => {
      setloading(true)
      getUser()
    });
    return unsubscribe;
  }, [navigation,artisans])

  const getUser = () => {
    if (token) {
      setagentArtisans(artisans)
      setTimeout(() => {
        setloading(false)
      }, 2000);
    }
    else {
      setloading(false)
      checkButton()
    }
  }
  return (
    <>
      {loading && <Loader />}
      <Header>
        <Pressable onPress={() =>  navigation.goBack()}>
          <Image source={require('../../components/assets/images/left.png')} style={styles.left} />
        </Pressable>
      </Header>
      <ScrollView style={styles.screen}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <LabelCard
          title={"Your Registered Artisans"}
          totalClientRegistered={agentArtisans.length}
        />
        <View style={styles.container}>
          <SharedList
            style={{
              width: width * .97,
              alignSelf: 'center'
            }}
            data={agentArtisans} keyExtractor={(item) => { item._id }} renderItem={(data) =>
              <ClientObjectCard totalSaved={`${convertToThousand(calculateRevenueAmount(data.item.thrifts))}`}
                nameOfClient={data.item.full_name} key={data.item._id} />}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: width,
    backgroundColor: '#e3e3e3'
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: width * .97,
    alignItems: "center",
    justifyContent: 'center',
  },
  section: {
    width: "100%",
    alignItems: "center",
  },
  p: {
    color: "#fff",
    fontSize: '14@msr',
  },
  left: {
    width: '22@msr',
    height: '22@msr',
  },
});

export default AllClientScreen;
