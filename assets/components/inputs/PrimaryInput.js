import { Pressable, TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../constants";

const PrimaryInput = (props) => {
  const { placeholder, inputStyles, iconName, iconSize, iconColor } = props;
  return (
    <View style={styles.wrapper}>
      <Ionicons name={iconName} size={iconSize} color={COLORS.troBlue} />
      <TextInput
        style={[styles.inputStyle, inputStyles]}
        {...props}
      />
    </View>
  );
};
export default PrimaryInput;

const styles = ScaledSheet.create({
  wrapper: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.troBlue,
    margin: "15@msr",
  },
  inputStyle: {
    width: "90%",
    height: "30@msr",
    color: "#01065B",
    fontFamily: "semiBold",
    fontSize: "12@msr",
    
  },
});
