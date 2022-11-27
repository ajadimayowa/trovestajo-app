import { View, StyleSheet, Pressable, Text } from "react-native";
const CardButton = ({ children, onPress, externalOuterStyle,externalInnerStyle }) => {
  return (
    <View style={[styles.outerView, externalOuterStyle,{margin:'2%'}]}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
        onPress={onPress}
      >
        <View style={[styles.innerView,externalInnerStyle]}>
          <Text style={styles.p}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};
export default CardButton;

const styles = StyleSheet.create({
  outerView: {
    width: 100,
    height: 40,
  },
  pressed: {
    opacity: 0.7,
  },
  innerView: {
    minWidth: "100%",
    minHeight: 45,
    borderRadius: 5,
    backgroundColor: "#01065B",
    alignItems: "center",
    justifyContent: "center",
  },
  p: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
    textAlign:'center'
  },
  outerStyle: {},
});
