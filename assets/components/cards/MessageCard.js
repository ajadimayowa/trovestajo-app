import { View, StyleSheet, Text } from "react-native";

const MessageCard = ({}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          
          padding: 10,
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
          alignItems:'center',
          justifyContent: "space-around",
          // backgroundColor:'pink'
          
        }}
      >
        <View style={{ width: "80%" }}>
            <Text
              style={{
                // backgroundColor: "green",
                fontSize: 10,
                width:'100%',
                flex:1,
                color:'#fff',
                flexWrap:'wrap'
              }}
            >
              We appreciate your effort as an agent Keep up the good job
            </Text>
          
        </View>
        <View style={{backgroundColor:'#fff', height:25, width:25, borderRadius:8, justifyContent:'center', alignItems:'center'}}>
          <Text>0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#01065B',
    width: "90%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: "#7D1312",
    shadowColor: "#0000",
    shadowOffset: [0, 3],
  },
  section_one: {},
  section_one_views: {},
  section_two: {},
  section_two_views: {},
  p: {
    fontSize: 15,
    fontWeight:'600',
    color: "#fff",
  },
});
export default MessageCard;
