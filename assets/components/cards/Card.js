import { View, StyleSheet, Text } from "react-native";

const Card = ({}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          // backgroundColor:'pink',
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "5%",
          flexDirection: "row",
        }}
      >
        <View style={{width:'50%'}}>
          
          <View><Text style={{fontSize:10, fontWeight:'700'}}>Designated Local Govmt</Text></View>
          <View><Text style={{fontSize:10, fontWeight:'500'}}>Eti - Osa Lga</Text></View>
        </View>
        <View style={{width:'50%'}}>
        <View><Text style={{fontSize:10, fontWeight:'700'}}>Next Review Date</Text></View>
          <View><Text style={{fontSize:10, fontWeight:'500'}}>25/06/2022</Text></View>
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
        <View style={{width:'50%'}}>
          
        <View><Text style={{fontSize:10, fontWeight:'700'}}>Admin Handler</Text></View>
          <View><Text style={{fontSize:10, fontWeight:'500'}}>Stephanie Jules</Text></View>
        </View>
        <View style={{width:'50%'}}>
        <View><Text style={{fontSize:10, fontWeight:'700'}}>Admin Handler</Text></View>
          <View><Text style={{fontSize:10, fontWeight:'500'}}>Stephanie Jules</Text></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
    flexDirection: "column",
    width: "100%",
    height: 167,
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "#0015",
    shadowOpacity: 5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    marginTop: 15,
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
