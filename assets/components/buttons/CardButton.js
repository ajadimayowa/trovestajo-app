import { View, Pressable, Text } from "react-native";
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from "../../../constants";

const CardButton = ({ children, onPress, externalOuterStyle, externalInnerStyle,textStyles }) => {
  return (
    <View style={[styles.outerView, externalOuterStyle, { margin: '2%' }]}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
        onPress={onPress}
      >
        <View style={[styles.innerView, externalInnerStyle]}>
          <Text style={[styles.p,textStyles]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};
export default CardButton;

const styles = ScaledSheet.create({
  outerView: {
    width: '100@msr',
    height: '40@msr',
  },
  pressed: {
    opacity: 0.7,
  },
  innerView: {
    minWidth: "100%",
    minHeight: '45@msr',
    borderRadius: '5@msr',
    backgroundColor: COLORS.troBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  p: {
    color: "#fff",
    fontSize: '9@msr',
    fontWeight: "700",
    textAlign: 'center'
  },
  outerStyle: {},
});
