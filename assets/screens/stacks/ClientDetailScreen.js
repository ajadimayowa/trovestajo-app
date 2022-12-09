import React, { useState, useMemo, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { useLayoutEffect } from "react";
import Header from "../../components/main/Header";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import CircleCard from "../../components/cards/CircleCard";
import { dateFormat, convertToThousand } from "../../../constants";
import ThriftsPayment from '../modals/ThriftsPayment';


const { width, height } = Dimensions.get('window')
const ClientDetailScreen = (props) => {
  // const minutes = new Date().getSeconds();
  const { navigation, route } = props
  const { artisan, totalSaved } = route.params

  const [setTime, setsetTime] = useState('')

  const timeFormat = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const timeOfDay = hours > 11 ? 'PM' : 'AM'
    if (hours > 12) hours = hours % 12
    hours = hours < 10 ? `0${hours}` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    setsetTime(`${hours}:${minutes}:${seconds} ${timeOfDay}`)
  }

  useEffect(() => {
    timeFormat()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          <View style={{
            width,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image source={require('../../components/assets/images/left.png')} style={styles.left} />
            </Pressable>
            <Text style={[styles.p, { color: "#01065B" }]}>
              {artisan?.full_name}
            </Text>
            <View />
          </View>
        </Header>
      ),
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="ios-people-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);

  const handlePayment = () => {
    Alert.alert('Payment Successfule')
  }
  return (
    <>
      <ScrollView style={styles.screen}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={[styles.section]}>
          <CircleCard
            externalStyle={{
              width: moderateScale(140),
              height: moderateScale(140),
              borderRadius: moderateScale(70),
              backgroundColor: "#fff",
            }}
          />
          <Text style={[styles.p]}> {artisan?.full_name}</Text>
          {/* <Text style={[styles.p, { fontSize: 12 }]}>
            savings type goes here
          </Text> */}
          {/* <Text style={[styles.p, { fontSize: 12 }]}>
            savings amount goes here
          </Text> */}
        </View>

        <>
          <Text style={styles.dateTime}>{`${dateFormat(new Date())} ${setTime}`}</Text>
        </>
        <ThriftsPayment />
        {/* <View style={[styles.section, { height: 170 }]}>
          <Pressable onPress={handlePayment} style={({ pressed }) => pressed ? styles.pressed : null}>
            <CircleCard
              externalStyle={{
                width: 140,
                height: 140,
                borderRadius: 70,
                backgroundColor: "#7D1312",
              }}
            ><Text style={styles.title}>Pay</Text>
            </CircleCard>
          </Pressable>
        </View> */}
        <View style={[styles.section1, { justifyContent: 'flex-start' }]}>
          <Text style={{ color: '#01065B', fontSize: moderateScale(18) }}>Activity Summary</Text>
        </View>
        <View style={[styles.section, { height: 200, paddingVertical: null, alignItems: 'flex-start' }]}>
          <View style={styles.activityCard}>
            <Text style={[{ color: '#fff', fontSize: moderateScale(18) }]}>Total amount saved</Text>

            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 37, fontWeight: '700' }}>{(totalSaved)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <Text style={[{ color: '#fff', fontSize: moderateScale(15) }]}>Due for withdrawal?</Text>
              <Text style={[{ color: '#fff', fontSize: moderateScale(15) }]}>No</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: width,
    paddingTop: '40@msr',
    backgroundColor: "#fff",
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  section1: {
    width: width * .97,
    paddingBottom: '10@msr',
    alignItems: "flex-start",
  },
  section: {
    height: '250@msr',
    alignItems: "center",
  },
  activityCard: {
    backgroundColor: '#01065B',
    width: '350@msr',
    height: '170@msr',
    padding: '20@msr',
    justifyContent: 'space-between'
  },
  dateTime: {
    marginTop: '-50@msr',
    marginBottom: '20@msr',
    color: '#7D1312',
    width,
    textAlign: 'center',
    fontSize: '18@msr'
  },
  p: {
    marginTop: '10@msr',
    fontSize: '18@msr',
    fontWeight: "600",
  },
  title: {
    fontSize: '37@msr',
    color: '#fff',
    fontWeight: '700'
  },
  header: {

  },
  left: {
    width: '20@msr',
    height: '20@msr',
  },
  pressed: {
    opacity: 0.5
  }
});
export default ClientDetailScreen;
