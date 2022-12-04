import { View, StyleSheet, Pressable, Text } from "react-native";
const LabelCard = ({
  title,
  totalClientRegistered,
  onPress,
  externalOuterStyle,
  externalInnerStyle,
}) => {
  return (
    <View style={[styles.innerView, externalInnerStyle]}>
      <Text style={styles.p}>{title}</Text>
      <View
        style={{
          backgroundColor: "#7D1312",
          minHeight: 24,
          minWidth: 65,
          borderRadius: 3,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>{totalClientRegistered}</Text>
      </View>
    </View>
  );
};
export default LabelCard;

const styles = StyleSheet.create({
  innerView: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderRadius:5,
    padding: 10,
    paddingHorizontal: "10%",
    backgroundColor: "#01065B",
    alignItems: "center",
    justifyContent: "space-between",
  },
  p: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  outerStyle: {},
});
