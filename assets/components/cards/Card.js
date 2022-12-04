import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Card = ({}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          // backgroundColor:'pink',
          alignItems: "center",
          justifyContent: "space-around",
          padding: "5%",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "50%", alignItems:'flex-start', flex:3 }}>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#01065B" }}>
              Designated Local Govmt
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons style={{marginRight:5}} name="location" size={8.57} color="black" />
            <Text style={{ fontSize: 10, fontWeight: "500" }}>
              Eti - Osa Lga
            </Text>
          </View>
        </View>
        <View style={{ width: "50%", alignItems:'flex-start', flex:2 }}>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#01065B" }}>
              Next Review Date
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons style={{marginRight:5}} name="calendar" size={11.11} color="black" />
            <Text style={{ fontSize: 10, fontWeight: "500" }}>25/06/2022</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "5%",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "50%",flex:3 }}>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#01065B" }}>
              Admin Handler
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center"}}>
          <Ionicons style={{marginRight:5}} name="person-sharp" size={10} color="black" />
            <Text style={{ fontSize: 10, fontWeight: "500" }}>
              Stephanie Jules
            </Text>
          </View>
        </View>
        <View style={{ width: "50%", alignItems:'flex-start', flex:2}}>
          <View>
            <Text style={{ fontSize: 10, fontWeight: "700", color: "#01065B",textAlign:'right'}}>
            Contact Info
            </Text>
          </View>
          <View>
            <View style={{width:'100%', flexDirection: "row", alignItems: "center"}}>
            <Foundation style={{marginRight:5}} name="telephone" size={10} color="black" />
            <Text style={{ fontSize: 10, fontWeight: "500" }}>
            08166064166
            </Text>
            </View>
            <View style={{width:'100%', flexDirection: "row", alignItems: "center"}}>
            <MaterialCommunityIcons style={{marginRight:5}} name="email" size={10} color="black" />
            <Text style={{ fontSize: 10, fontWeight: "500"}}>stephjules@trovest.com</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
    flexDirection: "column",
    width: 369,
    height: 167,
    alignItems: "center",
    borderRadius: 15,
    padding: "3%",
    shadowColor: "#0015",
    shadowOpacity: 5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    margin: 5,
  },
  section_one: {},
  section_one_views: {},
  section_two: {},
  section_two_views: {},
  p: {
    fontSize: 20,
    color: "#01065B",
  },
});
export default Card;
