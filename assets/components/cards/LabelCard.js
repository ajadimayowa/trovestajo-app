import { View, Text, Dimensions } from "react-native";
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { COLORS } from "../../../constants";

const { width } = Dimensions.get('window')
const LabelCard = ({
  title,
  totalClientRegistered,
  externalInnerStyle,
}) => {
  return (
    <View style={[styles.innerView, externalInnerStyle]}>
      <Text style={styles.p}>{title}</Text>
      <View
        style={{
          backgroundColor: COLORS.troBrown,
          width: moderateScale(75),
          borderRadius: moderateScale(3),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[styles.p, { marginBottom: moderateScale(7), marginTop: moderateScale(5) }]}>{totalClientRegistered}</Text>
      </View>
    </View>
  );
};
export default LabelCard;

const styles = ScaledSheet.create({
  innerView: {
    flexDirection: "row",
    width: width * .97,
    height: '50@msr',
    borderRadius: '5@msr',
    marginTop: '20@msr',
    padding: '10@msr',
    paddingHorizontal: "5%",
    backgroundColor: "#01065B",
    alignItems: "center",
    justifyContent: "space-between",
  },
  p: {
    color: "#fff",
    fontSize: '16@msr',
    fontFamily: "semiBold",
    textAlign: "center",
  },
  outerStyle: {},
});
