import React, { useEffect, useState } from "react";
import { Pressable, TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { COLORS } from "../../../constants";

const PrimaryInput = (props) => {
  const [secureText, setSecureText] = useState(true)
  const {
    placeholder,
    inputStyles,
    iconName,
    inputType,
    icon2Name,
    iconSize,
    iconColor,
  } = props;

 
    const togglePasswordShow =()=>{
      setSecureText(!secureText)
    }
  
  
  return (
    <View style={styles.wrapper}>
      <Ionicons name={iconName} size={iconSize} color={COLORS.troBlue} />
      <TextInput secureTextEntry={inputType === 'password' ? secureText : false}
      style={[styles.inputStyle, inputStyles, inputType == 'password'? {marginLeft:5}:null]}
      {...props} />
      <Pressable onPress={togglePasswordShow}>
        <Ionicons name={secureText ?'eye-off':icon2Name} size={iconSize} color={COLORS.troBlue} />
      </Pressable>
    </View>
  );
};
export default PrimaryInput;

const styles = ScaledSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.troBlue,
    margin: "15@msr",
    paddingRight:"10@msr"
  },
  inputStyle: {
    width: "90%",
    height: "30@msr",
    color: "#01065B",
    fontFamily: "semiBold",
    fontSize: "12@msr",
  },
});
