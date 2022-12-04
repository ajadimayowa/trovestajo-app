import { View, Pressable, Text, Dimensions } from "react-native";
import { ScaledSheet } from 'react-native-size-matters';


const { width, height } = Dimensions.get('window')
const ClientObjectCard = (props) => {
  const { nameOfClient, totalSaved, onPress, externalOuterStyle, externalInnerStyle } = props
  return (
    <View style={[styles.outerView, externalOuterStyle]}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
        onPress={onPress}
      >
        <View style={[styles.innerView, externalInnerStyle]}>
          <Text style={styles.p}>{nameOfClient}</Text>
          <View style={{
            backgroundColor: '#7D1312', minHeight: 24, minWidth: 65, borderRadius: 3,
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Text style={{ color: '#fff' }} >{totalSaved}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default ClientObjectCard;

const styles = ScaledSheet.create({
  outerView: {
    width: '100%',
  },
  pressed: {
    opacity: 0.7,
  },
  innerView: {
    flexDirection: 'row',
    marginTop: '10@msr',
    padding: '10@msr',
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "space-between",
  },
  p: {
    color: "#01065B",
    fontSize: 11,
    fontWeight: "700",
    textAlign: 'center'
  },
  outerStyle: {},
});