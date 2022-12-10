import { View, Text, Dimensions } from "react-native";
import { ScaledSheet,moderateScale } from 'react-native-size-matters';

const {width } = Dimensions.get('window')
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
          backgroundColor: "#7D1312",
          minHeight: moderateScale(24),
          minWidth: moderateScale(65),
          borderRadius: moderateScale(3),
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
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  outerStyle: {},
});
