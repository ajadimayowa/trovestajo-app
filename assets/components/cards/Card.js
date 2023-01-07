import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from "../../../constants";
import { moderateScale } from "react-native-size-matters";

const Card = (props) => {
  const { admin, agent } = props
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={{paddingRight:"1%", width: "50%", alignItems:'flex-start' }}>
          <View>
            <Text style={{ fontSize: moderateScale(12), fontFamily: "semiBold", color: COLORS.troBlue }}>
              Designated Local Govmt
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons style={{marginRight:5}} name="location" size={8.57} color="black" />
            <Text style={{  fontSize: moderateScale(12), fontFamily: "medium", color: COLORS.troBlue }}>
              {agent?.designated_govt || 'NIL'}
            </Text>
          </View>
        </View>
        <View style={{ marginLeft:15,width: "50%", alignItems:'flex-start', flex:2 }}>
          <View>
            <Text style={{ fontSize: moderateScale(12), fontFamily: "semiBold", color: COLORS.troBlue }}>
              Next Review Date
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons style={{marginRight:5}} name="calendar" size={11.11} color="black" />
            {/* <Text style={{ fontSize: moderateScale(12), fontFamily: "medium", color: COLORS.troBlue}}>{(agent?.review_date === null || agent?.review_date === undefined) ? 'No review date yet':  new Date(agent?.review_date).toLocaleDateString()}</Text> */}
            <Text style={{ fontSize: moderateScale(12), fontFamily: "medium", color: COLORS.troBlue}}>{(agent?.review_date === null || agent?.review_date === undefined) ? 'No review date yet':  new Date(agent?.review_date).toDateString()}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2%",
          flexDirection: "row",
          // backgroundColor:'yellow'
        }}
      >
        <View style={{ width: "50%"}}>
          <View >
            <Text style={{ fontSize: moderateScale(12), fontFamily: "semiBold", color: COLORS.troBlue }}>
              Admin Handler
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center"}}>
          <Ionicons style={{marginRight:5}} name="person-sharp" size={10} color="black" />
            <Text style={{  fontSize: moderateScale(12), fontFamily: "medium", color: COLORS.troBlue, marginRight: moderateScale(20) }}>
            {`${admin?.first_name} ${admin?.last_name}`}
            </Text>
          </View>
        </View>
        <View style={{ width: "50%", alignItems:'flex-start'}}>
          <View>
            <Text style={{ fontSize: moderateScale(12), fontFamily: "semiBold", color: COLORS.troBlue,textAlign:'right'}}>
            Contact Info
            </Text>
          </View>
          <View>
            <View style={{width:'100%', flexDirection: "row", alignItems: "center"}}>
            <Foundation style={{marginRight:5}} name="telephone" size={10} color="black" />
            <Text style={{ fontSize: moderateScale(12), fontFamily: "medium", color: COLORS.troBlue }}>
            {`${admin?.mobile}`}
            </Text>
            </View>
            <View style={{width:'100%', flexDirection: "row", alignItems: "flex-start"}}>
            <MaterialCommunityIcons style={{marginRight:5}} name="email" size={10} color="black" />
            <Text style={{  fontSize: moderateScale(12), fontFamily: "semiBold", color: COLORS.troBlue,width:'100%',}}> {`${admin?.email}`}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardColor,
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
