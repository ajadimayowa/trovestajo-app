import { View, StyleSheet, Text } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../constants";

const MessageCard = ({ }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          padding: moderateScale(10),
        }}
      >
        <Text style={styles.p}>0 Unread Messages</Text>
      </View>

      <View
        style={{
          flex: 1,
          width: "100%",
          padding: 10,
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: "space-around",
          // backgroundColor:'pink'

        }}
      >
        <View style={{ width: "80%" }}>
          <Text
            style={{
              // backgroundColor: "green",
              fontSize: moderateScale(10),
              width: '100%',
              color: '#fff',
              flexWrap: 'wrap',
              fontFamily: 'regular'
            }}
          >
            We appreciate your effort as an agent Keep up the good job
          </Text>

        </View>
        <View style={{ backgroundColor: '#fff', height: moderateScale(25), width: moderateScale(25), borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
          <Text>0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: COLORS.troBlue,
    width: "90%",
    height: '90@msr',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: '5@msr',
    borderWidth: 1,
    shadowColor: "#0000",
    shadowOffset: [0, 3],
  },
  section_one: {},
  section_one_views: {},
  section_two: {},
  section_two_views: {},
  p: {
    fontSize: '15@msr',
    fontFamily: 'semiBold',
    color: "#fff",
  },
});
export default MessageCard;
