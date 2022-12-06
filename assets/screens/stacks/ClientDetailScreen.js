import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useLayoutEffect } from "react";
import Header from "../../components/main/Header";
import { Ionicons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import CircleCard from "../../components/cards/CircleCard";

const ClientDetailScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header>
          <Text style={[styles.p, { color: "#01065B" }]}>
            Client Id Goes Here
          </Text>
        </Header>
      ),
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="ios-people-outline" size={size} color={color} />
      ),
    });
  }, [navigation]);

  const handlePayment = ()=>{
    Alert.alert('Payment Successfule')
  }
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.screen}>
        <View style={[styles.section, {height:250}]}>
          <CircleCard
            externalStyle={{
              width: 140,
              height: 140,
              borderRadius: 70,
              backgroundColor: "#fff",
            }}
          />
          <Text style={[styles.p]}>Client Name goes here</Text>
          <Text style={[styles.p, { fontSize: 12 }]}>
            savings type goes here
          </Text>
          <Text style={[styles.p, { fontSize: 12 }]}>
            savings amount goes here
          </Text>
        </View>

        <View style={[styles.section, {height:50,paddingVertical:15 }]}>
           <Text style={{color:'#7D1312'}}>current date and time goes here</Text>
        </View>

        <View style={[styles.section, {height:170}]}>
            <Pressable onPress={handlePayment} style={({pressed})=> pressed? styles.pressed:null}>
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
        </View>
        <View style={[styles.section,{height:60,alignItems:'flex-start'}]}>
            <Text style={{color:'#01065B'}}>Activity Summary</Text>
        </View>
        <View style={[styles.section,{height:200,paddingVertical:null, alignItems:'flex-start'}]}>
            <View style={styles.activityCard}>
                <Text style={[{color:'#fff', fontSize:12}]}>Total amount saved</Text>

                <View style={{alignItems:'center'}}>
                <Text style={{color:'#fff', fontSize:37, fontWeight:'700'}}> Total saved </Text>
                </View>
<View style={{flexDirection:'row', width:'40%', justifyContent:'space-between'}}>
                <Text style={[{color:'#fff', fontSize:12}]}>Due for withdrawal?</Text>
                <Text style={[{color:'#fff', fontSize:12}]}>No</Text>
                </View>


            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  section: {
    width: "100%",
    height: 250,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    // backgroundColor: "blue",
  },
  activityCard:{
    backgroundColor:'#01065B',
   width:350,
   height:170,
   padding:20,
   justifyContent:'space-between'
  },
  p: {
    fontSize: 18,
    fontWeight: "600",
  },
  title:{
    fontSize:37,
    color:'#fff',
    fontWeight:'700'
  },
  pressed:{
    opacity:0.5
  }
});
export default ClientDetailScreen;
