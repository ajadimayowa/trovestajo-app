import { View, StyleSheet, Pressable, Text } from "react-native";
const ClientObjectCard = ({nameOfClient, totalSaved, onPress, externalOuterStyle,externalInnerStyle }) => {
  return (
    <View style={[styles.outerView, externalOuterStyle,{margin:'2%'}]}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
        onPress={onPress}
      >
        <View style={[styles.innerView,externalInnerStyle]}>
          <Text style={styles.p}>{nameOfClient}</Text>
          <View style={{backgroundColor:'#7D1312', minHeight:24, minWidth:65, borderRadius:3,
          alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#fff'}} >{totalSaved}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default ClientObjectCard;

const styles = StyleSheet.create({
  outerView: {
    width: '100%',
    height: 40,
  },
  pressed: {
    opacity: 0.7,
  },
  innerView: {
    flexDirection:'row',
    minWidth: "100%",
    minHeight: 40,
    padding:10,
    paddingHorizontal:'10%',
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "space-between",
  },
  p: {
    color: "#01065B",
    fontSize: 11,
    fontWeight: "700",
    textAlign:'center'
  },
  outerStyle: {},
});
