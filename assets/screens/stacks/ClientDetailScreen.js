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
import ThriftsPayment from '../modals/ThriftsPayment';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../shared/Loader';
import { COLORS } from '../../../constants';



const { width, height } = Dimensions.get('window')
const ClientDetailScreen = (props) => {
  // const minutes = new Date().getSeconds();
  const selector = useSelector(state => state)
  const { token, agentData } = selector.agent
  const { navigation, route } = props
  const { artisan, totalSaved } = route.params
  const [loading, setloading] = useState(false)
  const [setTime, setsetTime] = useState('')

  const timeFormat = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const timeOfDay = hours > 11 ? 'PM' : 'AM'
    if (hours > 12) hours = hours % 12
    if (hours === 0) hours = 12
    hours = hours < 10 ? `0${hours}` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    setsetTime(`${hours}:${minutes}:${seconds} ${timeOfDay}`)
  }


  // useEffect(() => {
  //   timeFormat()
  // }, [])
  useEffect(() => {
    let secTimer = setInterval( () => {
      timeFormat()
    },1009)

    return () => clearInterval(secTimer);
}, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          <View style={{
            width,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: width * .97,
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

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? <Loader /> : <ScrollView style={styles.screen1}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.section}>
          <Image source={{ uri: (artisan?.image || 'https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg') }} style={{
            width: moderateScale(130),
            height: moderateScale(130),
            borderRadius: moderateScale(70),
            backgroundColor: "#fff",
          }} />
          <Text style={[styles.p]}> {artisan?.full_name}</Text>
          <Text style={[styles.p, { fontSize: moderateScale(18), paddingBottom: moderateScale(10), fontFamily: 'medium' }]}>
            Daily
          </Text>
          <Text style={styles.dateTime}>{`${new Date().toDateString()} | ${setTime}`}</Text>
        </View>
        <ThriftsPayment artisan={artisan} token={token} setloading={setloading} navigation={navigation} />
        <View style={[styles.section1, { justifyContent: 'flex-start' }]}>
          <Text style={{ color: '#01065B', fontSize: moderateScale(18), fontFamily: 'medium' }}>Activity Summary</Text>
        </View>
        <View style={[styles.section, { alignItems: 'center', marginBottom: moderateScale(70) }]}>
          <View style={styles.activityCard}>
            <Text style={[{ color: '#fff', fontSize: moderateScale(18), fontFamily: 'medium' }]}>Total amount saved</Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: moderateScale(37), fontFamily: 'medium', marginTop: moderateScale(18) }}>{(totalSaved)}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'flex-start',justifyContent: 'space-between', marginTop: moderateScale(20) }}>
              <Text style={[{ color: '#fff', fontSize: moderateScale(14), width: '60%', fontFamily: 'medium' }]}>Due for withdrawal?</Text>
              <Text style={[{ color: '#fff', fontSize: moderateScale(15),width: '50%'}]}>No</Text>
            </View>
          </View>
        </View>
      </ScrollView>}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: width,
    // paddingBottom: '40@msr',
    backgroundColor: "#fff",
  },
  screen1: {
    paddingTop: '30@msr',
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  section1: {
    width: width * .92,
    paddingBottom: '10@msr',
    alignItems: "flex-start",
  },
  section: {
    alignItems: "center",
  },
  activityCard: {
    backgroundColor: COLORS.troBlue,
    width: width * .92,
    // height: '170@msr',
    padding: '20@msr',
    paddingTop: '30@msr',
    paddingBottom: '30@msr',
    justifyContent: 'space-between'
  },
  dateTime: {
    marginBottom: '5@msr',
    color: '#7D1312',
    width,
    textAlign: 'center',
    fontFamily: 'medium',
    fontSize: '17@msr'
  },
  p: {
    marginTop: '10@msr',
    fontSize: '18@msr',
    fontFamily: "semiBold",
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
